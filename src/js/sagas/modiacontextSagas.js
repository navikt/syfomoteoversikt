import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api/index';
import * as actions from '../actions/modiacontext_actions';
import { PUSH_MODIACONTEXT_FORESPURT, HENT_AKTIVENHET_FORESPURT } from '../actions/actiontyper';

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
        const data = yield call(get, `${process.env.MODIACONTEXTHOLDER_ROOT}/context/aktivenhet`);
        action.data.callback(data.aktivEnhet);
    } catch (e) {
        yield put(actions.hentAktivEnhetFeilet());
    }
}

function* watchPushModiacontext() {
    yield* takeEvery(PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
}

function* watchAktivEnhet() {
    yield* takeEvery(HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}

export default function* modiacontextSagas() {
    yield [
        fork(watchPushModiacontext),
        fork(watchAktivEnhet),
    ];
}
