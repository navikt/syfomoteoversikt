import React, { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MineMoterContainer from "../containers/MineMoterContainer";
import EnhetensMoterContainer from "../containers/EnhetensMoterContainer";
import { setAmplitudeUserProperties } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";

const AppRouter = (): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();

  useEffect(() => {
    if (aktivEnhet) {
      setAmplitudeUserProperties({ valgtEnhet: aktivEnhet });
    }
  }, [aktivEnhet]);

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
