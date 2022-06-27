import express = require("express");
import { veiederInfoMock } from "./Data/veilederInfoMock";
import { veiledereMock } from "./Data/veiledereMock";
import { virksomhetsInfoMock } from "./Data/virksomhetsInfoMock";
import { dialogmoterMock } from "./Data/dialogmoterMock";

import { mockModiacontextholder } from "./mockModiacontextholder";

import Auth = require("../server/auth");
import mockSyfoperson from "./mockSyfoperson";

const mockEndepunkter = (server: any) => {
  server.get(
    "/syfoveileder/api/v2/veileder/self",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(veiederInfoMock));
    }
  );

  server.get(
    "/syfoveileder/api/v2/veileder/:ident",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(veiledereMock.find((v) => v.ident === req.params.ident))
      );
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/virksomhet/:orgnr",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(virksomhetsInfoMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/enhet/:enhetId",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/veilederident",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.post(
    "/isdialogmote/api/v2/dialogmote/overta",
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.send();
    }
  );

  mockModiacontextholder(server);
  mockSyfoperson(server);
};

export default mockEndepunkter;
