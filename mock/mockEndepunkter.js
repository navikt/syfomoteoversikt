const mockUtils = require('./mockUtils.js');

const generatedPersons = mockUtils.generatePersons(50);
const personInfo = [...mockUtils.personInfo, ...generatedPersons];

function mockForLokal(server) {
    server.get('/syfomoteadmin/api/virksomhet/:orgnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.virksomhetsInfo));
    });

    server.get('/syfomoteadmin/api/brukerinfo/:ident', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.brukerInfo));
    });

    server.get('/syfomoteadmin/api/veilederinfo/:ident', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.veilederInfo));
    });

    server.get('/syfomoteadmin/api/veilederinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.veilederInfo));
    });

    server.get('/syfoveilederoppgaver/api/veilederinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.veiledere));
    });

    server.get('/syfomoteadmin/api/aktor/:ident', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(fnrInfo));
    });

    server.get('/syfomoteadmin/api/moter?/navenhet=:enhetId', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.moter));
    });

    server.post('/syfomoteadmin/api/actions/moter/overfor', (req, res) => {
        res.send();
    });

    server.get('/syfomoteadmin/api/moter?veiledersmoter=true', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.moter));
    });

    server.post('/modiacontextholder/api/context', (req, res) => {
        res.send();
    });

    server.get('/modiacontextholder/api/context/aktivenhet', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.aktivEnhet));
    });

    server.get('/modiacontextholder/api/aktivenhet', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockUtils.aktivEnhet));
    });
}

module.exports = {
    mockForLokal,
};
