import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { Veileder } from "@/data/veiledere/veilederTypes";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

export const stubVeilederApi = (veileder: Veileder) =>
  mockServer.use(
    http.get(`*${SYFOVEILEDER_ROOT}/v3/veiledere/${veileder.ident}`, () =>
      HttpResponse.json(veileder)
    )
  );

export const stubAktivVeilederApi = (veileder: Veileder) =>
  mockServer.use(
    http.get(`*${SYFOVEILEDER_ROOT}/v3/veiledere/self`, () =>
      HttpResponse.json(veileder)
    )
  );
