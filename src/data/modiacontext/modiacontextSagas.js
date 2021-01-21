import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get, post } from "../../api";
import * as actions from "./modiacontext_actions";

export function* pushModiacontextSaga(action) {
  yield put(actions.pusherModiaContext());
  try {
    yield call(post, `${process.env.MODIACONTEXTHOLDER_ROOT}/context`, {
      verdi: action.data.verdi,
      eventType: action.data.eventType,
    });
    yield put(actions.modiaContextPushet());
  } catch (e) {
    yield put(actions.pushModiaContextFeilet());
  }
}

export function* aktivEnhetSaga(action) {
  yield put(actions.henterAktivEnhet());
  try {
    const data = yield call(
      get,
      `${process.env.MODIACONTEXTHOLDER_ROOT}/context/aktivenhet`
    );
    action.data.callback(data.aktivEnhet);
  } catch (e) {
    yield put(actions.hentAktivEnhetFeilet());
  }
}

function* watchPushModiacontext() {
  yield takeEvery(actions.PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
}

function* watchAktivEnhet() {
  yield takeEvery(actions.HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}

export default function* modiacontextSagas() {
  yield all([fork(watchPushModiacontext), fork(watchAktivEnhet)]);
}
