const express = require("express");
const path = require("path");
const prometheus = require("prom-client");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const axios = require("axios");

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["route"],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

const server = express();

server.use(express.json());

const modiacontextholderUrl =
  process.env.NAIS_CONTEXT === "preprod"
    ? "modiacontextholder.q1"
    : "modiacontextholder.default";

function nocache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}

server.use(
  "/syfomoteadmin/api",
  proxy("syfomoteadmin.default", {
    https: false,
    proxyReqPathResolver: function (req) {
      return `/syfomoteadmin/api${req.url}`;
    },
    proxyErrorHandler: function (err, res, next) {
      console.error("Error in proxy for syfomoteadmin", err);
      next(err);
    },
  })
);
server.use(
  "/modiacontextholder/api",
  proxy(modiacontextholderUrl, {
    https: false,
    proxyReqPathResolver: function (req) {
      console.log(req.url);
      return `/modiacontextholder/api${req.url}`;
    },
    proxyErrorHandler: function (err, res, next) {
      console.error("Error in proxy for modiacontextholder", err);
      next(err);
    },
  })
);

const isdialogmoteUrl =
  process.env.NAIS_CONTEXT === "preprod"
    ? "isdialogmote.dev.intern.nav.no"
    : "isdialogmote.intern.nav.no";

server.use(
  "/isdialogmote/api/v1/dialogmote/enhet/",
  cookieParser(),
  (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const enhetNr = req.url;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `https://${isdialogmoteUrl}/api/v1/dialogmote/enhet/${enhetNr}`;
    axios
      .get(url, options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.error("Error in proxy for isdialogmote", err.message);
        res.status(err.status).send(err.message);
      });
  }
);

server.get("/actuator/metrics", (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

server.get("/health/isAlive", (req, res) => {
  res.sendStatus(200);
});

server.get("/health/isReady", (req, res) => {
  res.sendStatus(200);
});

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

server.use(
  "/syfomoteoversikt",
  express.static(path.join(__dirname, "..", "build"))
);

server.use(
  "/syfomoteoversikt/img",
  express.static(path.resolve(__dirname, "img"))
);

server.get(
  [
    "/",
    "/syfomoteoversikt",
    "/syfomoteoversikt/*",
    /^\/syfomoteoversikt\/(?!(resources|img)).*$/,
  ],
  nocache,
  (req, res) => {
    res.sendFile(HTML_FILE);
    httpRequestDurationMicroseconds.labels(req.route.path).observe(10);
  }
);

server.use("/static", express.static(DIST_DIR));

const port = 8080;

server.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
