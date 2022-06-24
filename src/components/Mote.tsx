import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { TruncatedTableColumn } from "./MoteTable";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { MoteDato } from "./MoteDato";

interface MoteProps {
  mote: DialogmoterDTO;
}

const Mote = ({ mote }: MoteProps): ReactElement => {
  const orgnummer = mote.arbeidsgiver.virksomhetsnummer;
  const virksomhetQuery = useVirksomhetQuery(orgnummer);

  const virksomhetsNavn = (): string => {
    if (virksomhetQuery.isLoading) {
      return "Henter virksomhet...";
    } else if (virksomhetQuery.data) {
      return virksomhetQuery.data.navn;
    } else {
      return "Fant ikke virksomheten";
    }
  };

  return (
    <tr>
      <MoteDato mote={mote} />
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <TruncatedTableColumn>{virksomhetsNavn()}</TruncatedTableColumn>
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default Mote;
