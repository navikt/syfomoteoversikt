import nock from "nock";
import { SYFOPERSON_ROOT } from "@/utils/apiUrlUtil";
import { brukerFnr, brukernavnMock } from "./data";
import { NAV_PERSONIDENT_HEADER } from "@/api";

export const stubBrukernavnApi = (scope: nock.Scope) => {
  scope
    .get(`${SYFOPERSON_ROOT}/person/navn`)
    .matchHeader(NAV_PERSONIDENT_HEADER, brukerFnr)
    .reply(200, () => brukernavnMock);
};
