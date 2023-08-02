import React, { ReactElement } from "react";
import SideFullBredde from "@/sider/SideFullbredde";
import Feilmelding from "../components/Feilmelding";
import Moter from "../components/MineMoter";
import NavigasjonsTopp from "../components/NavigasjonsTopp";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import {
  enhetMoterOversiktRoutePath,
  mineMoterRoutePath,
} from "@/routers/AppRouter";
import { Loader } from "@navikt/ds-react";
import { Column, RowCentered } from "@/components/layout/Layout";

const texts = {
  ingenMoter: "Bruker har ingen møter",
};

const MineMoterContainer = (): ReactElement => {
  const dialogmoterQuery = useMineDialogmoterQuery();
  const harMoter =
    dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0;

  return (
    <SideFullBredde tittel="Møteoversikt">
      <Column>
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
          if (dialogmoterQuery.isInitialLoading) {
            return (
              <RowCentered>
                <Loader size="2xlarge" />
              </RowCentered>
            );
          } else if (dialogmoterQuery.isError) {
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
