import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { browserHistory } from 'react-router';
import { get, post } from '../api/index';
import * as actions from '../actions/moterEnhet_actions';

export function* hentEnhetsMoter(action) {
    yield put(actions.henterEnhetsMoter(action.enhet));
    try {
        const data = yield call(get, `${process.env.SYFOMOTEADMIN_REST_ROOT}/moter?navenhet=${action.enhet}`);
        yield put(actions.enhetsMoterHentet(data));
    } catch (e) {
        yield put(actions.hentEnhetsMoterFeilet());
    }
}

export function* overforMoter(action) {
    yield put(actions.overforerMoter());
    try {
        const data = yield call(post, `${process.env.SYFOMOTEADMIN_REST_ROOT}/actions/moter/overfor`, {
            moteUuidListe: action.moteUuidListe,
        });
        yield put(actions.moterOverfort(data));
        browserHistory.push('/syfomoteoversikt/minemoter');
    } catch (e) {
        yield put(actions.overforMoterFeilet());
    }
}

function* watchHentEnhetsMoter() {
    yield* takeEvery('HENT_ENHETSMOTER', hentEnhetsMoter);
}

function* watchOverforMoter() {
    yield* takeEvery('OVERFOR_MOTER_FORESPURT', overforMoter);
}

export default function* moterEnhetSagas() {
    yield [
        fork(watchHentEnhetsMoter),
        fork(watchOverforMoter),
    ];
}
