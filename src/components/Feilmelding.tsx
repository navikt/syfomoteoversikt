import { ReactElement } from "react";
import { LocalAlert } from "@navikt/ds-react";

interface FeilmeldingProps {
  tittel?: string;
  melding?: string;
}

export default function Feilmelding({
  tittel = "Beklager, det oppstod en feil",
  melding = "Vennligst prøv igjen litt senere.",
}: FeilmeldingProps): ReactElement {
  return (
    <LocalAlert status="error">
      <LocalAlert.Header>
        <LocalAlert.Title>{tittel}</LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>{melding}</LocalAlert.Content>
    </LocalAlert>
  );
}
