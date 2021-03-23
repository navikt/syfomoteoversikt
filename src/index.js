import { render } from "react-dom";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.less";
import moter from "./data/moter/moter";
import moterEnhet from "./data/moter/moterEnhet";
import veiledere from "./data/veiledere/veiledere";
import overfor from "./data/moter/overfor";
import dialogmoter from "./data/dialogmoter/dialogmoter";
import rootSaga from "./sagas/index";
import { hentMoter } from "./data/moter/moter_actions";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  moter,
  overfor,
  veiledere,
  moterEnhet,
  dialogmoter,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch(hentMoter());

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store, history };
