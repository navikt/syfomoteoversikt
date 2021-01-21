import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./moter_actions";

export function* hentMoter() {
  yield put(actions.henterMoter());
  try {
    const data = yield call(
      get,
      `${process.env.SYFOMOTEADMIN_REST_ROOT}/moter?veiledersmoter=true`
    );
    yield put(actions.moterHentet(data));
  } catch (e) {
    yield put(actions.hentMoterFeilet());
  }
}

function* watchHentMoter() {
  yield takeEvery("HENT_MOTER_FORESPURT", hentMoter);
}

export default function* moterSagas() {
  yield all([fork(watchHentMoter)]);
}
