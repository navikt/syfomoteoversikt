import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/veileder_actions';

export function* hentVeileder() {
    yield put(actions.henterVeileder());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/veilederinfo`);
        yield put(actions.veilederHentet(data));
    } catch (e) {
        yield put(actions.hentVeilederFeilet());
    }
}


function* watchHentVeileder() {
    yield* takeEvery('HENT_VEILEDER_FORESPURT', hentVeileder);
}

export default function* veilederSagas() {
    yield [
        fork(watchHentVeileder),
    ];
}
