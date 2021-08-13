import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "@/api";
import * as actions from "./bruker_actions";
import { BrukerinfoDTO } from "./BrukerinfoDTO";
import { HentBrukerAction } from "./bruker_actions";
import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";

export function* hentBruker(action: HentBrukerAction) {
  yield put(actions.henterBruker());
  try {
    const data: BrukerinfoDTO = yield call(
      get,
      `${SYFOMOTEADMIN_ROOT}/v2/brukerinfo/${action.ident}`
    );
    yield put(actions.brukerHentet(data, action.moteUuid));
  } catch (e) {
    yield put(actions.hentBrukerFeilet());
  }
}

function* watchHentBruker() {
  yield takeEvery(actions.HENT_BRUKER_FORESPURT, hentBruker);
}

export default function* brukerSagas() {
  yield all([fork(watchHentBruker)]);
}
