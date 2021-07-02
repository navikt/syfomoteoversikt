import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.less";
import { hentMoter } from "./data/moter/moter_actions";
import { hentVeileder } from "./data/veiledere/veileder_actions";
import { initAmplitude } from "./amplitude/amplitude";
import { setupStore } from "./data/store";

const store = setupStore();
store.dispatch(hentMoter());
store.dispatch(hentVeileder({}));

initAmplitude();

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store };
