const { merge } = require("webpack-merge");
const path = require("path");
const express = require("express");

const common = require("./webpack.common.js");
const mockEndepunkter = require("./mock/mockEndepunkter");
const Auth = require("./server/auth/index.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "/static",
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "dist"),
      staticOptions: {
        redirect: false,
      },
    },
    onAfterSetupMiddleware: (devServer) => {
      setupDev(devServer);
    },
  },
});

const setupDev = async (devServer) => {
  const { app, compiler } = devServer;

  await Auth.setupAuth(app);

  mockEndepunkter(app);
  app.use(
    "/syfomoteoversikt/img",
    express.static(path.resolve(__dirname, "img"))
  );
  app.use("/static", express.static(path.resolve(__dirname, "dist")));

  app.use("*", (req, res) => {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        res.sendFile(path.resolve(__dirname, "public/error.html"));
        return;
      }

      res.set("Content-Type", "text/html");
      res.send(result);
      res.end();
    });
  });
};
