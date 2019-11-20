require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const prometheus = require('prom-client');
const proxy = require('express-http-proxy');

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({timeout: 5000});

const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});
const server = express();

const env = process.argv[2];
const settings = env === 'local' ? {isProd: false} : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = () => {
    return new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {},
                settings,
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            },
        );
    });
};

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

const startServer = (html) => {
    server.use(
        '/moteoversikt/resources',
        express.static(path.resolve(__dirname, 'dist/resources')),
    );

    server.use(
        '/moteoversikt/img',
        express.static(path.resolve(__dirname, 'dist/resources/img')),
    );

    server.get(
        ['/', '/moteoversikt/?', /^\/moteoversikt\/(?!(resources|img)).*$/],
        nocache,
        (req, res) => {
            res.send(html);
            httpRequestDurationMicroseconds
                .labels(req.route.path)
                .observe(10);
        },
    );

    server.get('/actuator/metrics', (req, res) => {
        res.set('Content-Type', prometheus.register.contentType);
        res.end(prometheus.register.metrics());
    });

    server.get('/health/isAlive', (req, res) => {
        res.sendStatus(200);
    });

    server.get('/health/isReady', (req, res) => {
        res.sendStatus(200);
    });

    if (env === 'local') {
        console.log('Setter opp lokale mock-endepunkter');
        require('./mock/mockEndepunkter')(server, env === 'local');
    } else {
        server.use('/syfo-tilgangskontroll/api', proxy('syfo-tilgangskontroll.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfo-tilgangskontroll/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for tilgang", err);
                next(err);
            },
        }));
        server.use('/modiasyforest/api', proxy('modiasyforest.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/modiasyforest/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for modiasyforest", err);
                next(err);
            },
        }));
    }

    const port = process.env.PORT || 8199;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => {
    console.log(errorMessage, details);
};

renderApp()
    .then(startServer, (error) => {
        logError('Failed to render app', error);
    });
