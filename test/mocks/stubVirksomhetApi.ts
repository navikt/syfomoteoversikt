import { EREG_ROOT } from "@/utils/apiUrlUtil";
import { eregOrganisasjonResponseMock, orgnr } from "./data";
import nock from "nock";

export const stubVirksomhetApi = (scope: nock.Scope) =>
  scope
    .get(`${EREG_ROOT}/organisasjon/${orgnr}`)
    .reply(200, () => eregOrganisasjonResponseMock);
