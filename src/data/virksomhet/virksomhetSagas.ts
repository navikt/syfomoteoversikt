import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./virksomhet_actions";
import { VirksomhetDTO } from "./VirksomhetDTO";
import {
  HENT_VIRKSOMHET_FORESPURT,
  HentVirksomhetAction,
} from "./virksomhet_actions";
import { SYFOMOTEADMIN_ROOT } from "../../utils/apiUrlUtil";

export function* hentVirksomhet(action: HentVirksomhetAction) {
  yield put(actions.henterVirksomhet());
  try {
    const data: VirksomhetDTO = yield call(
      get,
      `${SYFOMOTEADMIN_ROOT}/v2/virksomhet/${action.orgnummer}`
    );
    yield put(actions.virksomhetHentet(data, action.moteUuid));
  } catch (e) {
    yield put(actions.hentVirksomhetFeilet());
  }
}

function* watchHentVirksomhet() {
  yield takeEvery(HENT_VIRKSOMHET_FORESPURT, hentVirksomhet);
}

export default function* virksomhetSagas() {
  yield all([fork(watchHentVirksomhet)]);
}
