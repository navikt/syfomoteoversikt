import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { Veileder } from "@/data/veiledere/veilederTypes";
import nock from "nock";

export const stubVeilederApi = (scope: nock.Scope, veileder: Veileder) =>
  scope
    .get(`${SYFOVEILEDER_ROOT}/v3/veiledere/${veileder.ident}`)
    .reply(200, () => veileder);

export const stubAktivVeilederApi = (scope: nock.Scope, veileder: Veileder) =>
  scope
    .get(`${SYFOVEILEDER_ROOT}/v3/veiledere/self`)
    .reply(200, () => veileder);
