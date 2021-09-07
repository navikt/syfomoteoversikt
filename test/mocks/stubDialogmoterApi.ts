import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { aktivEnhetMock } from "./data";
import nock from "nock";

export const stubDialogmoterApi = (
  scope: nock.Scope,
  dialogmoter: DialogmoterDTO[]
) =>
  scope
    .get(`${ISDIALOGMOTE_ROOT}/v2/dialogmote/enhet/${aktivEnhetMock}`)
    .reply(200, () => dialogmoter);
