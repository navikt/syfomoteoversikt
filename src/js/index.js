import { render } from 'react-dom';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import AppRouter from './routers/AppRouter.js';
import history from './history.js';
import './utils/globals';
import moter from './reducers/moter';
import moterEnhet from './reducers/moterEnhet';
import veiledere from './reducers/veiledere';
import overfor from './reducers/overfor';
import modiacontext from './reducers/modiacontext';
import veilederinfo from './reducers/veilederinfo';
import rootSaga from './sagas/index';
import { hentAktivEnhet, pushModiaContext } from './actions/modiacontext_actions';
import { setAktivEnhet } from './actions/moterEnhet_actions';
import { hentMoter } from './actions/moter_actions';

const rootReducer = combineReducers({
    history,
    moter,
    overfor,
    veiledere,
    modiacontext,
    form: formReducer,
    moterEnhet,
    veilederinfo,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
const config = {
    config: {
        toggles: {
            visEnhetVelger: true,
            visVeileder: true,
            visSokefelt: true,
            toggleSendEventVedEnEnhet: true,
        },
        dataSources: {
            veileder: `${window.location.origin}/syfomoteadmin/api/internad/veilederinfo`,
            enheter: `${window.location.origin}/syfomoteadmin/api/internad/enheter`,
        },
        applicationName: 'Sykefraværsoppfølging',
        handlePersonsokSubmit: (nyttFnr) => {
            window.location = `/sykefravaer/${nyttFnr}/mote`;
        },
        handleChangeEnhet: (data) => {
            if (config.config.initiellEnhet !== data) {
                store.dispatch(setAktivEnhet(data));
                store.dispatch(pushModiaContext({
                    verdi: data,
                    eventType: 'NY_AKTIV_ENHET',
                }));
                config.config.initiellEnhet = data;
            }
        },
    },
};
store.dispatch(hentAktivEnhet({
    callback: (aktivEnhet) => {
        store.dispatch(setAktivEnhet(aktivEnhet));
        config.config.initiellEnhet = aktivEnhet;
        window.renderDecoratorHead(config);
    },
}));
store.dispatch(hentMoter());

render(<Provider store={store}>
    <AppRouter history={history} />
</Provider>, document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.renderDecoratorHead === 'function') {
        window.renderDecoratorHead(config);
    }
});

export {
    store,
    history,
};
