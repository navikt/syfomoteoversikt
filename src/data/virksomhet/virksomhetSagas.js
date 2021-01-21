import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./virksomhet_actions";

export function* hentVirksomhet(action) {
  yield put(actions.henterVirksomhet());
  try {
    const data = yield call(
      get,
      `${process.env.SYFOMOTEADMIN_REST_ROOT}/virksomhet/${action.orgnummer}`
    );
    yield put(actions.virksomhetHentet(data, action.moteUuid));
  } catch (e) {
    yield put(actions.hentVirksomhetFeilet());
  }
}

function* watchHentVirksomhet() {
  yield takeEvery("HENT_VIRKSOMHET_FORESPURT", hentVirksomhet);
}

export default function* virksomhetSagas() {
  yield all([fork(watchHentVirksomhet)]);
}
