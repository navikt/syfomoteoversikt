import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/moterEnhet_actions';

export function* hentEnhetsMoter(action) {
    yield put(actions.henterEnhetsMoter(action.enhet));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/moter?navenhet=${action.enhet}`);
        yield put(actions.enhetsMoterHentet(data));
    } catch (e) {
        yield put(actions.hentEnhetsMoterFeilet());
    }
}

function* watchHentEnhetsMoter() {
    yield* takeEvery('HENT_ENHETSMOTER', hentEnhetsMoter);
}

export default function* moterEnhetSagas() {
    yield [
        fork(watchHentEnhetsMoter),
    ];
}
