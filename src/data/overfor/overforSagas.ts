import { call, put, takeEvery } from "redux-saga/effects";
import {
  dialogmoterOverfort,
  moterOverfort,
  OVERFOR_DIALOGMOTER_FORESPURT,
  OVERFOR_MOTER_FORESPURT,
  OverforDialogmoterAction,
  overforDialogmoterFeilet,
  overforerDialogmoter,
  overforerMoter,
  OverforMoterAction,
  overforMoterFeilet,
  resetDialogmoteOverforing,
  resetMoteOverforing,
} from "./overfor_actions";
import { post } from "../../api";
import { ISDIALOGMOTE_ROOT, SYFOMOTEADMIN_ROOT } from "../../utils/apiUrlUtil";

export function* overforMoter(action: OverforMoterAction) {
  yield put(overforerMoter());
  try {
    yield call(post, `${SYFOMOTEADMIN_ROOT}/v2/actions/moter/overfor`, {
      moteUuidListe: action.moteUuids,
    });

    yield put(moterOverfort());
    yield put(resetMoteOverforing());
  } catch (e) {
    yield put(overforMoterFeilet());
  }
}

export function* overforDialogmoter(action: OverforDialogmoterAction) {
  yield put(overforerDialogmoter());
  try {
    yield call(post, `${ISDIALOGMOTE_ROOT}/v2/dialogmote/overta`, {
      dialogmoteUuids: action.dialogmoteUuids,
    });

    yield put(dialogmoterOverfort());
    yield put(resetDialogmoteOverforing());
  } catch (e) {
    yield put(overforDialogmoterFeilet());
  }
}

export default function* overforSagas() {
  yield takeEvery(OVERFOR_MOTER_FORESPURT, overforMoter);
  yield takeEvery(OVERFOR_DIALOGMOTER_FORESPURT, overforDialogmoter);
}
