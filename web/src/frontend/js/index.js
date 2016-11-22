import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import { reducer as formReducer } from 'redux-form';
import { ledetekster, hentLedetekster } from 'digisyfo-npm';
import moter from './reducers/moter';
import rootSaga from './sagas/index';
import { hentMoter } from './actions/moter_actions';

const rootReducer = combineReducers({
    history,
    moter,
    ledetekster,
    form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch(hentMoter());

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
