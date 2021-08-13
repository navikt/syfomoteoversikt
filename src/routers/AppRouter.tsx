import React, { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MineMoterContainer from "../containers/MineMoterContainer";
import EnhetensMoterContainer from "../containers/EnhetensMoterContainer";
import { useDispatch } from "react-redux";
import { setAmplitudeUserProperties } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/data/enhet/enhet_hooks";

const AppRouter = (): ReactElement => {
  const dispatch = useDispatch();
  const valgtEnhet = useAktivEnhet();

  useEffect(() => {
    setAmplitudeUserProperties({ valgtEnhet: valgtEnhet });
  }, [dispatch, valgtEnhet]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/syfomoteoversikt/minemoter"
          component={MineMoterContainer}
        />
        <Route
          exact
          path="/syfomoteoversikt/enhetensmoter"
          component={EnhetensMoterContainer}
        />
        <Route path="/syfomoteoversikt" component={MineMoterContainer} />
        <Route path="/" component={MineMoterContainer} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
