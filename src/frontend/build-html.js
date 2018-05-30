var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    timestamp: timestamp,
    buildRoot: 'http://localhost:3050/assets',
    restRoot: 'http://localhost:8196/mote/rest',
    syforestRoot: 'http://localhost:8084/modiasyforest/rest',
    veilederoppgaverRestRoot: 'http://localhost:8999/syfoveilederoppgaver/api',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'https://modapp-t6.adeo.no',
    enableLogging: true,
};

var prod = {
    timestamp: timestamp,
    buildRoot: '/moteoversikt/js',
    restRoot: '/mote/rest',
    syforestRoot: '/modiasyforest/rest',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    enableLogging: false,
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/moteoversiktfront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
