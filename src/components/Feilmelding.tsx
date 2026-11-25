import React, { ReactElement } from "react";
import { Heading, LocalAlert, Panel } from "@navikt/ds-react";

interface FeilmeldingProps {
  tittel?: string;
  melding?: string;
}

const Feilmelding = ({
  tittel = "Beklager, det oppstod en feil",
  melding = "Vennligst prøv igjen litt senere.",
}: FeilmeldingProps): ReactElement => (
  <LocalAlert status="error">
    <LocalAlert.Header>
      <LocalAlert.Title>{tittel}</LocalAlert.Title>
    </LocalAlert.Header>
    <LocalAlert.Content>{melding}</LocalAlert.Content>
  </LocalAlert>
);

export default Feilmelding;
