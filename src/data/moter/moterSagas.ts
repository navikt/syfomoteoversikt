import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./moter_actions";
import { MoteDTO } from "./moterTypes";
import { HENT_MOTER_FORESPURT } from "./moter_actions";
import { SYFOMOTEADMIN_ROOT } from "../../utils/apiUrlUtil";

export function* hentMoter() {
  yield put(actions.henterMoter());
  try {
    const data: MoteDTO[] = yield call(
      get,
      `${SYFOMOTEADMIN_ROOT}/v2/moter?veiledersmoter=true`
    );
    yield put(actions.moterHentet(data));
  } catch (e) {
    yield put(actions.hentMoterFeilet());
  }
}

function* watchHentMoter() {
  yield takeEvery(HENT_MOTER_FORESPURT, hentMoter);
}

export default function* moterSagas() {
  yield all([fork(watchHentMoter)]);
}
