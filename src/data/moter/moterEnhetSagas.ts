import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get, post } from "../../api";
import { MoteDTO } from "./moterTypes";
import {
  enhetsMoterHentet,
  HENT_ENHETSMOTER,
  HentEnhetsMoterAction,
  hentEnhetsMoterFeilet,
  henterEnhetsMoter,
} from "./moterEnhet_actions";
import {
  moterOverfort,
  OVERFOR_MOTER_FORESPURT,
  overforerMoter,
  OverforMoterAction,
  overforMoterFeilet,
} from "./overfor_actions";
import { SYFOMOTEADMIN_ROOT } from "../../utils/apiUrlUtil";

export function* hentEnhetsMoter(action: HentEnhetsMoterAction) {
  yield put(henterEnhetsMoter(action.enhet));
  try {
    const data: MoteDTO[] = yield call(
      get,
      `${SYFOMOTEADMIN_ROOT}/v2/moter?navenhet=${action.enhet}`
    );
    yield put(enhetsMoterHentet(data));
  } catch (e) {
    yield put(hentEnhetsMoterFeilet());
  }
}

export function* overforMoter(action: OverforMoterAction) {
  yield put(overforerMoter());
  try {
    yield call(post, `${SYFOMOTEADMIN_ROOT}/v2/actions/moter/overfor`, {
      moteUuidListe: action.moteUuidListe,
    });
    yield put(moterOverfort());
    window.location.href = "/syfomoteoversikt/minemoter";
  } catch (e) {
    yield put(overforMoterFeilet());
  }
}

function* watchHentEnhetsMoter() {
  yield takeEvery(HENT_ENHETSMOTER, hentEnhetsMoter);
}

function* watchOverforMoter() {
  yield takeEvery(OVERFOR_MOTER_FORESPURT, overforMoter);
}

export default function* moterEnhetSagas() {
  yield all([fork(watchHentEnhetsMoter), fork(watchOverforMoter)]);
}
