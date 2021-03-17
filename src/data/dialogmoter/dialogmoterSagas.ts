import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api/index";
import * as actions from "./dialogmoter_actions";
import { DialogmoterState } from "./dialogmoter";
import { HentDialogmoterReturnType } from "./dialogmoter_actions";

export function* hentDialogmoter(action: HentDialogmoterReturnType) {
  yield put(actions.hentDialogmoterHenter());
  try {
    const path = `${process.env.ISDIALOGMOTE_ROOT}/v1/dialogmote/enhet/${action.enhetNr}`;
    const data = yield call(get, path);

    if (data && !!data.err) {
      yield put(actions.hentDialogmoterFeilet());
    } else {
      yield put(actions.hentDialogmoterHentet(data || {}, action.enhetNr));
    }
  } catch (e) {
    yield put(actions.hentDialogmoterFeilet());
  }
}

export const skalHenteDialogmoter = (state: {
  dialogmoter: DialogmoterState;
}) => {
  const reducer = state.dialogmoter;
  return !reducer.hentingForsokt;
};

export function* hentDialogmoterHvisIkkeHentet(
  action: HentDialogmoterReturnType
) {
  const skalHente = yield select(skalHenteDialogmoter);
  if (skalHente) {
    yield hentDialogmoter(action);
  }
}

export default function* dialogmoterSagas() {
  yield all([
    takeEvery(
      actions.HENT_DIALOGMOTER_FORESPURT,
      hentDialogmoterHvisIkkeHentet
    ),
  ]);
}
