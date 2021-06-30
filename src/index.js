import { render } from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.less";
import rootSaga from "./sagas/index";
import { hentMoter } from "./data/moter/moter_actions";
import { hentVeileder } from "./data/veiledere/veileder_actions";
import { createRootReducer } from "./data/rootState";

const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch(hentMoter());
store.dispatch(hentVeileder({}));

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store, history };
