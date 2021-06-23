import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./veileder_actions";
import { HENT_VEILEDER, HenterVeilederAction } from "./veileder_actions";
import { VeilederDto } from "./veilederTypes";
import { SYFOVEILEDER_ROOT } from "../../utils/apiUrlUtil";

export function* hentVeileder(action: HenterVeilederAction) {
  yield put(actions.henterVeileder(action.data));
  try {
    const optionalPathParameter = action.data.ident
      ? `/${action.data.ident}`
      : "/self";
    const data: VeilederDto = yield call(
      get,
      `${SYFOVEILEDER_ROOT}/v2/veileder${optionalPathParameter}`
    );
    yield put(actions.veilederHentet(data));
    if (!action.data.ident) {
      yield put(actions.setAktivVeileder(data.ident || ""));
    }
  } catch (e) {
    yield put(actions.hentVeilederFeilet(action.data));
  }
}

function* watchHentVeileder() {
  yield takeEvery(HENT_VEILEDER, hentVeileder);
}

export default function* veilederSagas() {
  yield all([fork(watchHentVeileder)]);
}
