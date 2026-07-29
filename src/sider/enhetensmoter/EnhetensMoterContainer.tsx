import React, { ReactElement, useEffect } from "react";
import SideFullBredde from "@/components/layout/SideFullbredde";
import Feilmelding from "../../components/Feilmelding";
import NavigasjonsTopp from "../../components/NavigasjonsTopp";

import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { BodyShort, Box, Loader } from "@navikt/ds-react";
import { Column, RowCentered } from "@/components/layout/Layout";
import EnhetensMoter from "@/sider/enhetensmoter/EnhetensMoter.tsx";

const texts = {
  ingenMoter: "Enheten har ingen aktive møter.",
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
      <Column>
        <NavigasjonsTopp />
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
          } else if (dialogmoterQuery.isLoading) {
            return (
              <RowCentered>
                <Loader size="2xlarge" />
              </RowCentered>
            );
          } else if (dialogmoterQuery.isError) {
            return <Feilmelding />;
          } else if (harMoter) {
            return <EnhetensMoter />;
          }
          return (
            <Box background="default" padding="space-16">
              <BodyShort>{texts.ingenMoter}</BodyShort>
            </Box>
          );
        })()}
      </Column>
    </SideFullBredde>
  );
};

export default EnhetensMoterContainer;
