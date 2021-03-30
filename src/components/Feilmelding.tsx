import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import { Undertittel } from "nav-frontend-typografi";

interface FeilmeldingProps {
  tittel?: string;
  melding?: string;
}

const Feilmelding = ({
  tittel = "Beklager, det oppstod en feil",
  melding = "Vennligst prøv igjen litt senere.",
}: FeilmeldingProps): ReactElement => (
  <Panel className="feilmelding">
    <Undertittel>{tittel}</Undertittel>
    <p>{melding}</p>
  </Panel>
);

export default Feilmelding;
