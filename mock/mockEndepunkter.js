const mockUtils = require("./mockUtils.js");
const mockDialogmoter = require("./mockDialogmoter");
const mockModiacontextholder = require("./mockModiacontextholder");

function mockEndepunkter(server) {
  server.get("/syfoveileder/api/v1/veileder/self", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockUtils.veilederInfo));
  });

  server.get("/syfoveileder/api/v1/veileder/:ident", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockUtils.veilederInfo));
  });

  server.get("/syfomoteadmin/api/internad/virksomhet/:orgnr", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockUtils.virksomhetsInfo));
  });

  server.get("/syfomoteadmin/api/internad/brukerinfo/:ident", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockUtils.brukerInfo));
  });

  server.get("/syfomoteadmin/api/internad/aktor/:aktorId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockUtils.fnrInfo));
  });

  server.post(
    "/syfomoteadmin/api/internad/actions/moter/overfor",
    (req, res) => {
      res.send();
    }
  );

  server.get("/syfomoteadmin/api/internad/moter", (req, res) => {
    if (req.query.veiledersmoter) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.moter));
    } else if (req.query.navenhet) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.moter));
    } else {
      res.send();
    }
  });

  server.get(
    "/syfomoteadmin/api/internad/moter?navenhet=enhetId",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.moter));
    }
  );

  server.get("/isdialogmote/api/v1/dialogmote/enhet", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify([mockDialogmoter.getDefaultDialogmote()]));
  });

  mockModiacontextholder(server);
}

module.exports = mockEndepunkter;
