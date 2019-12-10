import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import path from 'path';

const dotEnvPath = path.resolve('.env');

require('dotenv').config({
    path: dotEnvPath,
});

Enzyme.configure({ adapter: new Adapter() });

require("@babel/register");
//disable
const jsdom = require('jsdom');

const document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = document.defaultView;

global.document = document;
global.window = window;
global.window.APP_SETTINGS = {
    APP_ROOT: '/moteoversikt',
};
let temp = null;
const localS = {
    getItem: function(key) {
        return temp;
    },
    setItem: function(key, value) {
        temp = value;
    }
};

global.localStorage = localS;

propagateToGlobal(window);

function propagateToGlobal (window) {
    for(let key in window) {
        if(!window.hasOwnProperty(key)) {
            continue;
        }

        if(key in global) {
            continue;
        }
        global[key] = window[key];
    }
}
