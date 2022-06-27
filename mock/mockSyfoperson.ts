import express = require("express");
import { brukernavnMock } from "./Data/brukernavnMock";

import Auth = require("../server/auth");
import { NAV_PERSONIDENT_HEADER } from "../src/api";
import { SYFOPERSON_ROOT } from "../src/utils/apiUrlUtil";

const mockSyfoperson = (server: any) => {
  server.get(
    `${SYFOPERSON_ROOT}/person/navn`,
    Auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      if (req.headers[NAV_PERSONIDENT_HEADER]?.length === 11) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(brukernavnMock));
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );
};

export default mockSyfoperson;
