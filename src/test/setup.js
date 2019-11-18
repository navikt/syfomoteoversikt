import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

require("babel-core/register");
//disable
const jsdom = require('jsdom');
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = document.defaultView;

global.document = document;
global.window = window;
global.window.APP_SETTINGS = {
    APP_ROOT: '/sykefravaer',
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