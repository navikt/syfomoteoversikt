import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/ledetekster_actions';

export function* hentLedetekster() {
    yield put(actions.henterLedetekster());
    try {
        const ledetekster = yield call(get, `${window.APP_SETTINGS.SYFOREST_ROOT}/informasjon/tekster`);
        yield put(actions.ledeteksterHentet(ledetekster));
    } catch (e) {
        yield put(actions.hentLedeteksterFeilet());
    }
}

function* watchHentLedetekster() {
    yield* takeEvery('HENT_LEDETEKSTER_FORESPURT', hentLedetekster);
}

export default function* ledeteksterSagas() {
    yield fork(watchHentLedetekster);
}
