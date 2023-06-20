import express from "express";

export const eregOrganisasjonResponse = {
  navn: {
    navnelinje1: "Skomaker Andersen",
    redigertnavn: "Skomaker Andersen, Oslo",
  },
};

const mockEreg = (server: express.Application) => {
  server.get(
    "/ereg/api/v1/organisasjon/:orgnr",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(eregOrganisasjonResponse));
    }
  );
};

export default mockEreg;
