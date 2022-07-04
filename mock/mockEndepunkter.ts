import express from "express";
import { ensureAuthenticated } from "../server/auth";
import { veiederInfoMock } from "./Data/veilederInfoMock";
import { veiledereMock } from "./Data/veiledereMock";
import { virksomhetsInfoMock } from "./Data/virksomhetsInfoMock";
import { dialogmoterMock } from "./Data/dialogmoterMock";

import { mockModiacontextholder } from "./mockModiacontextholder";

import mockSyfoperson from "./mockSyfoperson";

const mockEndepunkter = (server: express.Application) => {
  server.get(
    "/syfoveileder/api/v2/veileder/self",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(veiederInfoMock));
    }
  );

  server.get(
    "/syfoveileder/api/v2/veileder/:ident",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(veiledereMock.find((v) => v.ident === req.params.ident))
      );
    }
  );

  server.get(
    "/syfomoteadmin/api/internad/v2/virksomhet/:orgnr",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(virksomhetsInfoMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/enhet/:enhetId",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/veilederident",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.post(
    "/isdialogmote/api/v2/dialogmote/overta",
    ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.send();
    }
  );

  mockModiacontextholder(server);
  mockSyfoperson(server);
};

export default mockEndepunkter;
