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
  const virksomhetsnummer = mote.arbeidsgiver.virksomhetsnummer;
  const virksomhetQuery = useVirksomhetQuery(virksomhetsnummer);

  const virksomhetsNavn = (): string => {
    if (virksomhetQuery.isInitialLoading) {
      return "Henter virksomhet...";
    } else if (virksomhetQuery.virksomhetsnavn) {
      return virksomhetQuery.virksomhetsnavn;
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
