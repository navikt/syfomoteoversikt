import React, { ReactElement } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { Panel } from "@navikt/ds-react";
import styled from "styled-components";

interface FeilmeldingProps {
  tittel?: string;
  melding?: string;
}

const StyledPanel = styled(Panel)`
  text-align: center;
`;

const Feilmelding = ({
  tittel = "Beklager, det oppstod en feil",
  melding = "Vennligst prøv igjen litt senere.",
}: FeilmeldingProps): ReactElement => (
  <StyledPanel>
    <Undertittel>{tittel}</Undertittel>
    <p>{melding}</p>
  </StyledPanel>
);

export default Feilmelding;
