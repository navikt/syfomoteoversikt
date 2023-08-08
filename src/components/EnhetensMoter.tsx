import React, { ReactElement } from "react";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { Alert } from "@navikt/ds-react";
import styled from "styled-components";

const texts = {
  overtaDialogmoterFeilet:
    "Det skjedde en feil så du ikke fikk overtatt dialogmøte-innkallingene.",
  provIgjen: "Prøv igjen senere.",
  ingenMoter: "Enheten har ingen aktive møter.",
};

interface OverforFeilmeldingProps {
  children: string;
}

const StyledAlert = styled(Alert)`
  margin-bottom: 2em;
`;

const OverforFeilmelding = ({ children }: OverforFeilmeldingProps) => (
  <StyledAlert size="small" variant="warning">
    {children}
    <br />
    {texts.provIgjen}
  </StyledAlert>
);

const EnhetensMoter = (): ReactElement => {
  const overforDialogmoter = useOverforDialogmoter();
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const harMoter =
    dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0;

  return (
    <div>
      {overforDialogmoter.isError && (
        <OverforFeilmelding>{texts.overtaDialogmoterFeilet}</OverforFeilmelding>
      )}
      {!harMoter && (
        <div className="panel">
          <p>{texts.ingenMoter}</p>
        </div>
      )}
      {harMoter && <MoteoversiktEnhet />}
    </div>
  );
};

export default EnhetensMoter;
