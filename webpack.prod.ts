import { merge } from "webpack-merge";

import common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
});
