import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./fnr_actions";
import { AktorDTO } from "./AktorDTO";

export function* hentFnr(action: ReturnType<typeof actions.hentFnr>) {
  yield put(actions.henterFnr());
  try {
    const data: AktorDTO = yield call(
      get,
      `${process.env.SYFOMOTEADMIN_REST_ROOT}/aktor/${action.ident}`
    );
    yield put(actions.fnrHentet(data.fnr, action.moteUuid));
  } catch (e) {
    yield put(actions.hentFnrFeilet());
  }
}

function* watchHentFnr() {
  yield takeEvery(actions.HENT_FNR_FORESPURT, hentFnr);
}

export default function* fnrSagas() {
  yield all([fork(watchHentFnr)]);
}
