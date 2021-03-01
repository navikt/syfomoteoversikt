import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MineMoterContainer from "../containers/MineMoterContainer";
import EnhetensMoterContainer from "../containers/EnhetensMoterContainer";

const AppRouter = () => {
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
