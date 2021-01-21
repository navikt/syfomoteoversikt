import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./fnr_actions";

export function* hentFnr(action) {
  yield put(actions.henterFnr());
  try {
    const data = yield call(
      get,
      `${process.env.SYFOMOTEADMIN_REST_ROOT}/aktor/${action.ident}`
    );
    yield put(actions.fnrHentet(data.fnr, action.moteUuid));
  } catch (e) {
    yield put(actions.hentFnrFeilet());
  }
}

function* watchHentFnr() {
  yield takeEvery("HENT_FNR_FORESPURT", hentFnr);
}

export default function* fnrSagas() {
  yield all([fork(watchHentFnr)]);
}
