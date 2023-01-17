import React, { ReactElement, useEffect } from "react";
import { Column, Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import SideFullBredde from "@/sider/SideFullbredde";
import Feilmelding from "../components/Feilmelding";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import EnhetensMoter from "../components/EnhetensMoter";

import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import {
  enhetMoterOversiktRoutePath,
  mineMoterRoutePath,
} from "@/routers/AppRouter";

const texts = {
  ingenMoter: "Enheten har ingen møter",
};

const EnhetensMoterContainer = (): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const { dispatch } = useMoteoverforing();
  useEffect(() => {
    dispatch({ type: MoteoverforingActionType.ResetAntallOverfort });
  }, [dispatch]);
  const harMoter =
    dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0;

  return (
    <SideFullBredde tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: mineMoterRoutePath,
              aktiv: false,
            },
            {
              tittel: "Enhetens møter",
              url: enhetMoterOversiktRoutePath,
              aktiv: true,
            },
          ]}
        />
        {(() => {
          if (!aktivEnhet) {
            return (
              <Feilmelding
                tittel={"Ingen aktiv enhet"}
                melding={
                  "Du må velge enhet i enhetsvelgeren i toppen av siden."
                }
              />
            );
          } else if (dialogmoterQuery.isInitialLoading) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (dialogmoterQuery.isError) {
            return <Feilmelding />;
          } else if (harMoter) {
            return <EnhetensMoter />;
          }
          return <p>{texts.ingenMoter}</p>;
        })()}
      </Column>
    </SideFullBredde>
  );
};

export default EnhetensMoterContainer;
