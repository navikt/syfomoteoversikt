import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/moterKontor_actions';

export function* hentKontoretsMoter(action) {
    yield put(actions.henterKontoretsMoter());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/moter?navenhet=${action.enhet}`);
        yield put(actions.kontoretsMoterHentet(data));
    } catch (e) {
        yield put(actions.hentKontoretsMoterFeilet());
    }
}

function* watchHentKontoretsMoter() {
    yield* takeEvery('HENT_KONTORETSMOTER', hentKontoretsMoter);
}

export default function* moterKontorSagas() {
    yield [
        fork(watchHentKontoretsMoter),
    ];
}
