import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import path from "path";

Enzyme.configure({ adapter: new Adapter() });

const dotEnvPath = path.resolve(".env");

require("dotenv").config({
  path: dotEnvPath,
});

const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => {
      return typeof target[prop] === "undefined";
    })
    .map((prop) => {
      return Object.getOwnPropertyDescriptor(src, prop);
    });
  Object.defineProperties(target, props);
}

let temp = null;
const localS = {
  getItem() {
    return temp;
  },
  setItem(key, value) {
    temp = value;
  },
};

global.HTMLElement = window.HTMLElement;
global.localStorage = localS;
global.XMLHttpRequest = window.XMLHttpRequest;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
copyProps(window, global);
