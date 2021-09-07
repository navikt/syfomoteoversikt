import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { aktorMock, brukerFnr, brukerMock } from "./data";
import nock from "nock";

export const stubBrukerApi = (scope: nock.Scope) =>
  scope
    .get(`${SYFOMOTEADMIN_ROOT}/v2/brukerinfo/${brukerFnr}`)
    .reply(200, () => brukerMock);
export const stubFnrApi = (scope: nock.Scope) => {
  scope
    .get(`${SYFOMOTEADMIN_ROOT}/v2/aktor/${brukerFnr}`)
    .reply(200, () => aktorMock);
};
