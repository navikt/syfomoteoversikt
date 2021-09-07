import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { aktivEnhetMock } from "./data";
import { MoteDTO } from "@/data/moter/moterTypes";
import nock from "nock";

export const stubEnhetensMoterApi = (scope: nock.Scope, moter: MoteDTO[]) =>
  scope
    .get(`${SYFOMOTEADMIN_ROOT}/v2/moter?navenhet=${aktivEnhetMock}`)
    .reply(200, () => moter);

export const stubVeiledersMoterApi = (scope: nock.Scope, moter: MoteDTO[]) =>
  scope
    .get(`${SYFOMOTEADMIN_ROOT}/v2/moter?veiledersmoter=true`)
    .reply(200, () => moter);
