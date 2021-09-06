import React, { ReactElement } from "react";
import { Row, Column } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import Side from "../sider/Side";
import Feilmelding from "../components/Feilmelding";
import Moter from "../components/MineMoter";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { useDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useVeiledersMoterQuery } from "@/data/moter/moterQueryHooks";

const texts = {
  ingenMoter: "Bruker har ingen møter",
};

const MineMoterContainer = (): ReactElement => {
  const moterQuery = useVeiledersMoterQuery();
  const dialogmoterQuery = useDialogmoterQuery();
  const harMoter =
    (moterQuery.isSuccess && moterQuery.data.length > 0) ||
    (dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0);

  return (
    <Side tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: "/syfomoteoversikt/minemoter",
              aktiv: true,
            },
            {
              tittel: "Enhetens møter",
              url: "/syfomoteoversikt/enhetensmoter",
              aktiv: false,
            },
          ]}
        />
        {(() => {
          if (moterQuery.isLoading || dialogmoterQuery.isLoading) {
            return (
              <Row className="row-centered">
                <NavFrontendSpinner type="XL" />
              </Row>
            );
          } else if (moterQuery.isError && dialogmoterQuery.isError) {
            return <Feilmelding />;
          } else if (harMoter) {
            return <Moter />;
          }
          return <p>{texts.ingenMoter}</p>;
        })()}
      </Column>
    </Side>
  );
};

export default MineMoterContainer;
