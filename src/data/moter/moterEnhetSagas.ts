import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import { MoteDTO } from "./moterTypes";
import {
  enhetsMoterHentet,
  HENT_ENHETSMOTER,
  HentEnhetsMoterAction,
  hentEnhetsMoterFeilet,
  henterEnhetsMoter,
} from "./moterEnhet_actions";
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

export default function* moterEnhetSagas() {
  yield takeEvery(HENT_ENHETSMOTER, hentEnhetsMoter);
}
