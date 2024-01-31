import React, { ReactElement } from "react";
import { Heading, Panel } from "@navikt/ds-react";

interface FeilmeldingProps {
  tittel?: string;
  melding?: string;
}

const Feilmelding = ({
  tittel = "Beklager, det oppstod en feil",
  melding = "Vennligst prøv igjen litt senere.",
}: FeilmeldingProps): ReactElement => (
  <Panel className="text-center">
    <Heading size="small">{tittel}</Heading>
    <p>{melding}</p>
  </Panel>
);

export default Feilmelding;
