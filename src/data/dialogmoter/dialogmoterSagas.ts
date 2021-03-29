import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import { DialogmoterState } from "./dialogmoter";
import {
  HentDialogmoterAction,
  hentDialogmoterFeilet,
  hentDialogmoterHenter,
  hentDialogmoterHentet,
  HENT_DIALOGMOTER_FORESPURT,
} from "./dialogmoter_actions";

export function* hentDialogmoter(action: HentDialogmoterAction) {
  yield put(hentDialogmoterHenter());
  try {
    const path = `${process.env.ISDIALOGMOTE_ROOT}/v1/dialogmote/enhet/${action.enhetNr}`;
    const data = yield call(get, path);

    if (data && !!data.err) {
      yield put(hentDialogmoterFeilet());
    } else {
      yield put(hentDialogmoterHentet(data || {}, action.enhetNr));
    }
  } catch (e) {
    yield put(hentDialogmoterFeilet());
  }
}

export const skalHenteDialogmoter = (state: {
  dialogmoter: DialogmoterState;
}) => {
  const reducer = state.dialogmoter;
  return !reducer.hentingForsokt;
};

export function* hentDialogmoterHvisIkkeHentet(action: HentDialogmoterAction) {
  const skalHente = yield select(skalHenteDialogmoter);
  if (skalHente) {
    yield hentDialogmoter(action);
  }
}

export default function* dialogmoterSagas() {
  yield all([
    takeEvery(HENT_DIALOGMOTER_FORESPURT, hentDialogmoterHvisIkkeHentet),
  ]);
}
