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
const modiacontextholderUrl =  process.env.NAIS_CONTEXT === 'preprod' ? 'modiacontextholder.q1' : 'modiacontextholder.default';

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
        '/syfomoteoversikt/resources',
        express.static(path.resolve(__dirname, 'dist/resources')),
    );
    server.use(
        '/syfomoteoversikt/img',
        express.static(path.resolve(__dirname, 'dist/resources/img')),
    );

    server.get(
        ['/', '/syfomoteoversikt/?', /^\/syfomoteoversikt\/(?!(resources|img)).*$/],
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

    if (env === 'local' || env === 'opplaering') {
        console.log('Setter opp lokale mock-endepunkter');
        require('./mock/mockEndepunkter').mockForLokal(server);
    } else {
        server.use('/syfomoteadmin/api', proxy('syfomoteadmin.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfomoteadmin/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfomoteadmin", err);
                next(err);
            },
        }));
        server.use('/syfoveilederoppgaver/api', proxy('syfoveilederoppgaver.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfoveilederoppgaver/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfoveilederoppgaver", err);
                next(err);
            },
        }));
        server.use('/modiacontextholder/api', proxy(modiacontextholderUrl,  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for modicontextholder", err);
                next(err);
            },
        }))
    }

    const port = process.env.PORT || 8080;
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
