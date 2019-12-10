import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/bruker_actions';

export function* hentBruker(action) {
    yield put(actions.henterBruker());
    try {
        const data = yield call(get, `${process.env.SYFOMOTEADMIN_REST_ROOT}/brukerinfo/${action.ident}`);
        yield put(actions.brukerHentet(data, action.moteUuid));
    } catch (e) {
        yield put(actions.hentBrukerFeilet());
    }
}

function* watchHentBruker() {
    yield* takeEvery('HENT_BRUKER_FORESPURT', hentBruker);
}

export default function* brukerSagas() {
    yield [
        fork(watchHentBruker),
    ];
}
