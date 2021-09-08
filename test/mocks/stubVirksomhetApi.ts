import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { orgnr, virksomhetMock } from "./data";
import nock from "nock";

export const stubVirksomhetApi = (scope: nock.Scope) =>
  scope
    .get(`${SYFOMOTEADMIN_ROOT}/v2/virksomhet/${orgnr}`)
    .reply(200, () => virksomhetMock);
