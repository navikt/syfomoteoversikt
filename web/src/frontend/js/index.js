import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import { reducer as formReducer } from 'redux-form';
import { hasURLParameter } from 'digisyfo-npm';
import moter from './reducers/moter';
import moterEnhet from './reducers/moterEnhet';
import veiledere from './reducers/veiledere';
import overfor from './reducers/overfor';
import modiacontext from './reducers/modiacontext';
import ledetekster from './reducers/ledetekster';
import rootSaga from './sagas/index';
import { hentAktivEnhet, pushModiaContext } from './actions/modiacontext_actions';
import { setAktivEnhet } from './actions/moterEnhet_actions';
import { opprettWebsocketConnection } from './contextHolder';
import { hentLedetekster } from './actions/ledetekster_actions';
import { hentMoter } from './actions/moter_actions';
import { finnMiljoStreng } from './utils/index';

const rootReducer = combineReducers({
    history,
    moter,
    overfor,
    ledetekster,
    veiledere,
    modiacontext,
    form: formReducer,
    moterEnhet,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

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
            veileder: `${window.location.origin}/mote/rest/veilederinfo`,
            enheter: `${window.location.origin}/mote/rest/enheter`,
        },
        applicationName: 'Møteoversikt',
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
store.dispatch(hentLedetekster());

if (hasURLParameter('visLedetekster')) {
    localStorage.setItem('visLedetekster', true);
} else {
    localStorage.removeItem('visLedetekster');
}

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    window.renderDecoratorHead && window.renderDecoratorHead(config);
});

opprettWebsocketConnection((wsCallback) => {
    if (wsCallback.data === 'NY_AKTIV_ENHET') {
        store.dispatch(hentAktivEnhet({
            callback: (aktivEnhet) => {
                if (config.config.initiellEnhet !== aktivEnhet) {
                    config.config.initiellEnhet = aktivEnhet;
                    window.renderDecoratorHead(config);
                    store.dispatch(setAktivEnhet(aktivEnhet));
                }
            },
        }));
    }
});

export {
    store,
    history,
};
