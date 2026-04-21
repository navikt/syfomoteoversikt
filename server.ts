import express from "express";
import helmet from "helmet";
import path from "path";
import prometheus from "prom-client";
import { validateToken } from "./server/authUtils.js";
import { setupProxy } from "./server/proxy.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const nocache = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

const redirectIfUnauthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (await validateToken(req)) {
    next();
  } else {
    res.redirect(`/oauth2/login?redirect=${req.originalUrl}`);
  }
};

const setupServer = async () => {
  server.use(setupProxy());

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
    [nocache, redirectIfUnauthorized],
    (req: express.Request, res: express.Response) => {
      res.sendFile(HTML_FILE);
      httpRequestDurationMicroseconds.labels(req.route.path).observe(10);
    }
  );

  server.use("/static", express.static(DIST_DIR));

  const port = 8080;

  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

setupServer();
