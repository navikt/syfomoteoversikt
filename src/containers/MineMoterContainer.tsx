import React, { ReactElement } from "react";
import { Row, Column } from "nav-frontend-grid";
import NavFrontendSpinner from "nav-frontend-spinner";
import SideFullBredde from "@/sider/SideFullbredde";
import Feilmelding from "../components/Feilmelding";
import Moter from "../components/MineMoter";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useVeiledersMoterQuery } from "@/data/moter/moterQueryHooks";
import {
  enhetMoterOversiktRoutePath,
  mineMoterRoutePath,
} from "@/routers/AppRouter";

const texts = {
  ingenMoter: "Bruker har ingen møter",
};

const MineMoterContainer = (): ReactElement => {
  const moterQuery = useVeiledersMoterQuery();
  const dialogmoterQuery = useMineDialogmoterQuery();
  const harMoter =
    (moterQuery.isSuccess && moterQuery.data.length > 0) ||
    (dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0);

  return (
    <SideFullBredde tittel="Møteoversikt">
      <Column className="col-xs-12">
        <NavigasjonsTopp
          lenker={[
            {
              tittel: "Mine møter",
              url: mineMoterRoutePath,
              aktiv: true,
            },
            {
              tittel: "Enhetens møter",
              url: enhetMoterOversiktRoutePath,
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
    </SideFullBredde>
  );
};

export default MineMoterContainer;
