import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import MineMoterContainer from "../sider/minemoter/MineMoterContainer";
import EnhetensMoterContainer from "../sider/enhetensmoter/EnhetensMoterContainer";

export const mineMoterRoutePath = "/syfomoteoversikt/minemoter";
export const enhetMoterOversiktRoutePath = "/syfomoteoversikt/enhetensmoter";

const AppRouter = (): ReactElement => {
  return (
    <Router>
      <Routes>
        <Route path={mineMoterRoutePath} element={<MineMoterContainer />} />
        <Route
          path={enhetMoterOversiktRoutePath}
          element={<EnhetensMoterContainer />}
        />
        <Route path="*" element={<Navigate to={mineMoterRoutePath} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
