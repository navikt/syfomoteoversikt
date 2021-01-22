import { render } from "react-dom";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import AppRouter from "./routers/AppRouter.js";
import history from "./history.js";
import "./utils/globals";
import "./styles/styles.less";
import moter from "./data/moter/moter";
import moterEnhet from "./data/moter/moterEnhet";
import veiledere from "./data/veiledere/veiledere";
import overfor from "./data/moter/overfor";
import modiacontext from "./data/modiacontext/modiacontext";
import veilederinfo from "./data/veilederinfo/veilederinfo";
import rootSaga from "./sagas/index";
import {
  hentAktivEnhet,
  pushModiaContext,
} from "./data/modiacontext/modiacontext_actions";
import { setAktivEnhet } from "./data/moter/moterEnhet_actions";
import { hentMoter } from "./data/moter/moter_actions";
import { fullNaisUrlDefault } from "./utils/miljoUtil";

const rootReducer = combineReducers({
  history,
  moter,
  overfor,
  veiledere,
  modiacontext,
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
      enheter: `${window.location.origin}/syfomoteadmin/api/internad/veilederinfo/enheter`,
    },
    applicationName: "Sykefraværsoppfølging",
    handlePersonsokSubmit: (nyttFnr) => {
      const host = "syfomodiaperson";
      const path = `/sykefravaer/${nyttFnr}`;
      window.location = fullNaisUrlDefault(host, path);
    },
    handleChangeEnhet: (data) => {
      if (config.config.initiellEnhet !== data) {
        store.dispatch(setAktivEnhet(data));
        store.dispatch(
          pushModiaContext({
            verdi: data,
            eventType: "NY_AKTIV_ENHET",
          })
        );
        config.config.initiellEnhet = data;
      }
    },
  },
};
store.dispatch(
  hentAktivEnhet({
    callback: (aktivEnhet) => {
      store.dispatch(setAktivEnhet(aktivEnhet));
      config.config.initiellEnhet = aktivEnhet;
      window.renderDecoratorHead(config);
    },
  })
);
store.dispatch(hentMoter());

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById("maincontent")
);

document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.renderDecoratorHead === "function") {
    window.renderDecoratorHead(config);
  }
});

export { store, history };