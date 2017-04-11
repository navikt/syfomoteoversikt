import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import { reducer as formReducer } from 'redux-form';
import { ledetekster } from 'digisyfo-npm';
import moter from './reducers/moter';
import moterEnhet from './reducers/moterEnhet';
import veileder from './reducers/veileder';
import rootSaga from './sagas/index';
import { hentMoter } from './actions/moter_actions';
import { hentVeileder } from './actions/veileder_actions';
import { hentEnhetsMoter } from './actions/moterEnhet_actions';

const rootReducer = combineReducers({
    history,
    moter,
    ledetekster,
    veileder,
    form: formReducer,
    moterEnhet,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch(hentMoter());
store.dispatch(hentVeileder());

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        config: {
            toggles: {
                visEnhetVelger: true,
                visVeileder: true,
                visSokefelt: true,
                overrideenhetersaga: true,
                overrideveiledersaga: true,
            },
            applicationName: 'Oversikt dialogmøter',
            handleChangeEnhet: (enhet) => {
                store.dispatch(hentEnhetsMoter(enhet));
            },
        },
    };

    renderDecoratorHead(config);
});

export {
    store,
    history,
};
