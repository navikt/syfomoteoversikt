import React, { ReactElement } from "react";
import SideFullBredde from "@/components/layout/SideFullbredde";
import Feilmelding from "../../components/Feilmelding";
import NavigasjonsTopp from "../../components/NavigasjonsTopp";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { Loader } from "@navikt/ds-react";
import { Column } from "@/components/layout/Layout";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";
import MineMoter from "@/sider/minemoter/MineMoter";

const MineMoterContainer = (): ReactElement => {
  const aktivVeilederQuery = useAktivVeileder();
  const dialogmoterQuery = useMineDialogmoterQuery();

  const isLoading = aktivVeilederQuery.isLoading || dialogmoterQuery.isLoading;
  const isError = aktivVeilederQuery.isError || dialogmoterQuery.isError;
  const isSuccess = aktivVeilederQuery.isSuccess && dialogmoterQuery.isSuccess;

  return (
    <SideFullBredde tittel="Møteoversikt">
      <Column>
        <NavigasjonsTopp />
        {isLoading && <Loader size="2xlarge" className="flex justify-center" />}
        {isError && <Feilmelding />}
        {isSuccess && (
          <MineMoter
            aktivVeileder={aktivVeilederQuery.data}
            moter={dialogmoterQuery.data}
          />
        )}
      </Column>
    </SideFullBredde>
  );
};

export default MineMoterContainer;
