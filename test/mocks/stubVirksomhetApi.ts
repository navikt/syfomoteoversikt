import { EREG_ROOT } from "@/utils/apiUrlUtil";
import { eregOrganisasjonResponseMock, orgnr } from "./data";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

export const stubVirksomhetApi = () =>
  mockServer.use(
    http.get(`*${EREG_ROOT}/organisasjon/${orgnr}`, () =>
      HttpResponse.json(eregOrganisasjonResponseMock)
    )
  );
