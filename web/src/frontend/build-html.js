var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    timestamp: timestamp,
    buildRoot: 'http://localhost:3040/assets',
    restRoot: 'http://localhost:8185/mote/rest',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'https://modapp-q1.adeo.no',
    websocketProtocol: 'ws',
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    enableLogging: true,
};

var prod = {
    timestamp: timestamp,
    buildRoot: '/moteoversiktfssfront/js',
    restRoot: '/mote/rest',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    websocketProtocol: 'wss',
    contextholderRoot: '/eventdistributer',
    enableLogging: false,
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/moteoversiktfssfront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
