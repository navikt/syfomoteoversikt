import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./fnr_actions";
import { AktorDTO } from "./AktorDTO";
import { HentFnrAction } from "./fnr_actions";
import { SYFOMOTEADMIN_ROOT } from "../../utils/apiUrlUtil";

export function* hentFnr(action: HentFnrAction) {
  yield put(actions.henterFnr());
  try {
    const data: AktorDTO = yield call(
      get,
      `${SYFOMOTEADMIN_ROOT}/v2/aktor/${action.ident}`
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
