import React, { ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import MineMoterContainer from "../containers/MineMoterContainer";
import EnhetensMoterContainer from "../containers/EnhetensMoterContainer";
import { setAmplitudeUserProperties } from "@/amplitude/amplitude";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";

export const mineMoterRoutePath = "/syfomoteoversikt/minemoter";
export const enhetMoterOversiktRoutePath = "/syfomoteoversikt/enhetensmoter";

const AppRouter = (): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();

  useEffect(() => {
    if (aktivEnhet) {
      setAmplitudeUserProperties({ valgtEnhet: aktivEnhet });
    }
  }, [aktivEnhet]);

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
