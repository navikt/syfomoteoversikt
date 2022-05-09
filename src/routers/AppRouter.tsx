import React, { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route
          path="/syfomoteoversikt/minemoter"
          element={<MineMoterContainer />}
        />
        <Route
          path="/syfomoteoversikt/enhetensmoter"
          element={<EnhetensMoterContainer />}
        />
        <Route path="/syfomoteoversikt" element={<MineMoterContainer />} />
        <Route path="/" element={<MineMoterContainer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
