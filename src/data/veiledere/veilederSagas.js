import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./veileder_actions";

export function* hentVeileder(action) {
  yield put(actions.henterVeileder(action.data));
  try {
    const optionalPathParameter = action.data.ident
      ? `/${action.data.ident}`
      : "";
    const data = yield call(
      get,
      `${process.env.SYFOMOTEADMIN_REST_ROOT}/veilederinfo${optionalPathParameter}`
    );
    yield put(actions.veilederHentet(data));
  } catch (e) {
    yield put(actions.hentVeilederFeilet(action.data));
  }
}

function* watchHentVeileder() {
  yield takeEvery("HENT_VEILEDER_FORESPURT", hentVeileder);
}

export default function* veilederSagas() {
  yield all([fork(watchHentVeileder)]);
}
