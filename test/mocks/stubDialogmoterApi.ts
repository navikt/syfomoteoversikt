import {
  DialogmoterDTO,
  DialogmoteStatus,
} from "@/data/dialogmoter/dialogmoterTypes";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { aktivEnhetMock } from "./data";
import nock from "nock";
import { VeilederInfoDto } from "@/data/veiledere/veilederTypes";

export const stubDialogmoterApi = (
  scope: nock.Scope,
  dialogmoter: DialogmoterDTO[]
) =>
  scope
    .get(`${ISDIALOGMOTE_ROOT}/v2/dialogmote/enhet/${aktivEnhetMock}`)
    .reply(200, () => dialogmoter);

export const stubDialogmoterVeilederidentApi = (
  scope: nock.Scope,
  veileder: VeilederInfoDto,
  dialogmoter: DialogmoterDTO[]
) =>
  scope
    .get(`${ISDIALOGMOTE_ROOT}/v2/dialogmote/veilederident`)
    .reply(200, () =>
      dialogmoter.filter(
        (dialogmote) =>
          dialogmote.tildeltVeilederIdent === veileder.ident &&
          (dialogmote.status == DialogmoteStatus.INNKALT ||
            dialogmote.status == DialogmoteStatus.NYTT_TID_STED)
      )
    );
