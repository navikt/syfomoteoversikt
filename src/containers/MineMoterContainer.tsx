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
import { Column } from "@/components/layout/Layout";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";

const MineMoterContainer = (): ReactElement => {
  const aktivVeilederQuery = useAktivVeileder();
  const dialogmoterQuery = useMineDialogmoterQuery();

  const isLoading = aktivVeilederQuery.isLoading || dialogmoterQuery.isLoading;
  const isError = aktivVeilederQuery.isError || dialogmoterQuery.isError;
  const isSuccess = aktivVeilederQuery.isSuccess && dialogmoterQuery.isSuccess;

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
        {isLoading && <Loader size="2xlarge" className="flex justify-center" />}
        {isError && <Feilmelding />}
        {isSuccess && (
          <Moter
            aktivVeileder={aktivVeilederQuery.data}
            moter={dialogmoterQuery.data}
          />
        )}
      </Column>
    </SideFullBredde>
  );
};

export default MineMoterContainer;
