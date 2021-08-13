import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "@/api";
import {
  HentDialogmoterAction,
  hentDialogmoterFeilet,
  hentDialogmoterHenter,
  hentDialogmoterHentet,
  HENT_DIALOGMOTER_FORESPURT,
} from "./dialogmoter_actions";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { DialogmoterDTO } from "./dialogmoterTypes";

export function* hentDialogmoter(action: HentDialogmoterAction) {
  yield put(hentDialogmoterHenter());
  try {
    const path = `${ISDIALOGMOTE_ROOT}/v2/dialogmote/enhet/${action.enhetNr}`;
    const data: DialogmoterDTO[] = yield call(get, path);
    yield put(hentDialogmoterHentet(data || {}, action.enhetNr));
  } catch (e) {
    yield put(hentDialogmoterFeilet());
  }
}

export default function* dialogmoterSagas() {
  yield takeEvery(HENT_DIALOGMOTER_FORESPURT, hentDialogmoter);
}
