const mockUtils = require("./mockUtils.js");
const mockDialogmoter = require("./mockDialogmoter");
const mockModiacontextholder = require("./mockModiacontextholder");

const Auth = require("../server/auth/index.js");

function mockEndepunkter(server) {
  server.get(
    "/syfoveileder/api/v2/veileder/self",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.veilederInfo));
    }
  );

  server.get(
    "/syfoveileder/api/v2/veileder/:ident",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(
          mockUtils.veiledere.find((v) => v.ident === req.params.ident)
        )
      );
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/virksomhet/:orgnr",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.virksomhetsInfo));
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/brukerinfo/:ident",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.brukerInfo));
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/aktor/:aktorId",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.fnrInfo));
    }
  );

  server.post(
    "/syfomoteadmin/api/internad/v2/actions/moter/overfor",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.send();
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/moter",
    Auth.ensureAuthenticated(),
    (req, res) => {
      if (req.query.veiledersmoter) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(mockUtils.moter));
      } else if (req.query.navenhet) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(mockUtils.moter));
      } else {
        res.send();
      }
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/moter?navenhet=enhetId",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockUtils.moter));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/enhet/:enhetId",
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockDialogmoter.getDialogmoter));
    }
  );

  mockModiacontextholder(server);
}

module.exports = mockEndepunkter;
