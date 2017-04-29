import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/fnr_actions';

export function* hentFnr(action) {
    yield put(actions.henterFnr());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/aktor/${action.ident}`);
        yield put(actions.fnrHentet(data.fnr, action.moteUuid));
    } catch (e) {
        yield put(actions.hentFnrFeilet());
    }
}

function* watchHentFnr() {
    yield* takeEvery('HENT_FNR_FORESPURT', hentFnr);
}

export default function* fnrSagas() {
    yield [
        fork(watchHentFnr),
    ];
}
