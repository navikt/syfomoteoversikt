import { http, HttpResponse } from "msw";

export const eregOrganisasjonResponse = {
  navn: {
    navnelinje1: "Skomaker Andersen",
    redigertnavn: "Skomaker Andersen, Oslo",
  },
};

const mockEreg = http.get("/ereg/api/v1/organisasjon/:orgnr", () =>
  HttpResponse.json(eregOrganisasjonResponse)
);

export default mockEreg;
