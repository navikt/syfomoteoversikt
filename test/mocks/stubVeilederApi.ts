import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { VeilederInfoDto } from "@/data/veiledere/veilederTypes";
import nock from "nock";

export const stubVeilederApi = (scope: nock.Scope, veileder: VeilederInfoDto) =>
  scope
    .get(`${SYFOVEILEDER_ROOT}/v2/veileder/${veileder.ident}`)
    .reply(200, () => veileder);

export const stubAktivVeilederApi = (
  scope: nock.Scope,
  veileder: VeilederInfoDto
) =>
  scope.get(`${SYFOVEILEDER_ROOT}/v2/veileder/self`).reply(200, () => veileder);
