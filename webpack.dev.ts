import { merge } from "webpack-merge";
import mockEndepunkter from "./mock/mockEndepunkter";

import path = require("path");
import express = require("express");
import common = require("./webpack.common");

import Auth = require("./server/auth");

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
    setupMiddlewares: (middlewares: any, devServer: any) => {
      setupDev(devServer);

      return middlewares;
    },
  },
});

const setupDev = async (devServer: { app: any; compiler: any }) => {
  const { app, compiler } = devServer;

  await Auth.setupAuth(app);

  mockEndepunkter(app);
  app.use(
    "/syfomoteoversikt/img",
    express.static(path.resolve(__dirname, "img"))
  );
  app.use("/static", express.static(path.resolve(__dirname, "dist")));

  app.use("*", (req: express.Request, res: express.Response) => {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
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
