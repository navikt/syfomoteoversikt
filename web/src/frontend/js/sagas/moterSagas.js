import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post, get } from '../api/index';
import * as actions from '../actions/moter_actions';

export function* hentMoter(action) {
    yield put(actions.henterMoter());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/moter?veiledersmoter=true`);
        yield put(actions.moterHentet(data));
    } catch (e) {
        yield put(actions.hentMoterFeilet());
    }
}


function* watchHentMoter() {
    yield* takeEvery('HENT_MOTER_FORESPURT', hentMoter);
}

export default function* moterSagas() {
    yield [
        fork(watchHentMoter),
    ];
}
