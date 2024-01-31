import express from "express";
import { veiederInfoMock } from "./Data/veilederInfoMock";
import {veiledereInfoMock, veiledereMock} from "./Data/veiledereInfoMock";
import { dialogmoterMock } from "./Data/dialogmoterMock";

import { mockModiacontextholder } from "./mockModiacontextholder";

import mockSyfoperson from "./mockSyfoperson";
import mockEreg from "./mockEreg";

const mockEndepunkter = (server: express.Application) => {
  server.get(
    "/syfoveileder/api/v2/veileder/self",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(veiederInfoMock));
    }
  );

  server.get(
    "/syfoveileder/api/v2/veileder/:ident",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(veiledereInfoMock.find((v) => v.ident === req.params.ident))
      );
    }
  );

  server.get(
      "/syfoveileder/api/v2/veiledere/enhet/:enhet",
      (req: express.Request, res: express.Response) => {
          res.setHeader("Content-Type", "application/json");
          res.send(
              JSON.stringify(veiledereMock)
          );
      }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/enhet/:enhetId",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.get(
    "/isdialogmote/api/v2/dialogmote/veilederident",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dialogmoterMock));
    }
  );

  server.post(
    "/isdialogmote/api/v2/dialogmote/overta",
    (req: express.Request, res: express.Response) => {
      res.send();
    }
  );

  mockEreg(server);
  mockModiacontextholder(server);
  mockSyfoperson(server);
};

export default mockEndepunkter;
