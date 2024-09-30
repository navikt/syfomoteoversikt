import {
  DialogmoterDTO,
  DialogmoteStatus,
} from "@/data/dialogmoter/dialogmoterTypes";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { aktivEnhetMock } from "./data";
import { Veileder } from "@/data/veiledere/veilederTypes";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

export const stubDialogmoterApi = (dialogmoter: DialogmoterDTO[]) =>
  mockServer.use(
    http.get(
      `*${ISDIALOGMOTE_ROOT}/v2/dialogmote/enhet/${aktivEnhetMock}`,
      () => HttpResponse.json(dialogmoter)
    )
  );

export const stubDialogmoterVeilederidentApi = (
  veileder: Veileder,
  dialogmoter: DialogmoterDTO[]
) =>
  mockServer.use(
    http.get(`*${ISDIALOGMOTE_ROOT}/v2/dialogmote/veilederident`, () =>
      HttpResponse.json(filterUnfinishedMoter(veileder, dialogmoter))
    )
  );

export function filterUnfinishedMoter(
  veileder: Veileder,
  dialogmoter: DialogmoterDTO[]
): DialogmoterDTO[] {
  return dialogmoter.filter(
    (dialogmote) =>
      dialogmote.tildeltVeilederIdent === veileder.ident &&
      (dialogmote.status == DialogmoteStatus.INNKALT ||
        dialogmote.status == DialogmoteStatus.NYTT_TID_STED)
  );
}
