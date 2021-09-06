import React, { ReactElement, useEffect } from "react";
import { Column, Row } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import EnhetensMoter from "../components/EnhetensMoter";

import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { useEnhetensMoterQuery } from "@/data/moter/moterQueryHooks";
import { useDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";

const texts = {
  ingenMoter: "Enheten har ingen møter",
};

const EnhetensMoterContainer = (): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();
  const moterEnhetQuery = useEnhetensMoterQuery();
  const dialogmoterQuery = useDialogmoterQuery();
  const { dispatch } = useMoteoverforing();
  useEffect(() => {
    dispatch({ type: MoteoverforingActionType.ResetAntallOverfort });
  }, [dispatch]);
  const harMoter =
    (moterEnhetQuery.isSuccess && moterEnhetQuery.data.length > 0) ||
    (dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0);

  return (
    <Side tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: "/syfomoteoversikt/minemoter",
              aktiv: false,
            },
            {
              tittel: "Enhetens møter",
              url: "/syfomoteoversikt/enhetensmoter",
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
          } else if (moterEnhetQuery.isLoading || dialogmoterQuery.isLoading) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (moterEnhetQuery.isError && dialogmoterQuery.isError) {
            return <Feilmelding />;
          } else if (harMoter) {
            return <EnhetensMoter />;
          }
          return <p>{texts.ingenMoter}</p>;
        })()}
      </Column>
    </Side>
  );
};

export default EnhetensMoterContainer;
