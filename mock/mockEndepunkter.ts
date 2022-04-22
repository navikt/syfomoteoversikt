import { veiederInfoMock } from "./Data/veilederInfoMock";
import { veiledereMock } from "./Data/veiledereMock";
import { virksomhetsInfoMock } from "./Data/virksomhetsInfoMock";
import { brukerinfoMock } from "./Data/brukerInfoMock";
import { fnrMock } from "./Data/fnrMock";
import { moterMock } from "./Data/moterMock";
import { dialogmoterMock } from "./Data/dialogmoterMock";

const mockModiacontextholder = require("./mockModiacontextholder");

const Auth = require("../server/auth/index.js");

const mockEndepunkter = (server: any) => {
  server.get(
    "/syfoveileder/api/v2/veileder/self",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(veiederInfoMock));
    }
  );

  server.get(
    "/syfoveileder/api/v2/veileder/:ident",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(veiledereMock.find((v) => v.ident === req.params.ident))
      );
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/virksomhet/:orgnr",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(virksomhetsInfoMock));
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/brukerinfo/:ident",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(brukerinfoMock));
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/aktor/:aktorId",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(fnrMock));
    }
  );

  server.post(
    "/syfomoteadmin/api/internad/v2/actions/moter/overfor",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.send();
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/moter",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      if (req.query.veiledersmoter) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(moterMock));
      } else if (req.query.navenhet) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(moterMock));
      } else {
        res.send();
      }
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/moter?navenhet=enhetId",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(moterMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/enhet/:enhetId",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/veilederident",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.post(
    "/isdialogmote/api/v2/dialogmote/overta",
    Auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.send();
    }
  );

  mockModiacontextholder(server);
};

export default mockEndepunkter;
