import React, { ReactElement } from "react";
import { findDeltakerByType } from "@/utils/moterUtil";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { MoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { TruncatedTableColumn } from "./MoteTable";
import { isDialogmote } from "@/utils/dialogmoterUtil";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { MoteDato } from "./MoteDato";

interface MoteProps {
  mote: MoteDTO | DialogmoterDTO;
}

const Mote = ({ mote }: MoteProps): ReactElement => {
  const orgnummer = isDialogmote(mote)
    ? mote.arbeidsgiver.virksomhetsnummer
    : findDeltakerByType(mote, "ARBEIDSGIVER")?.orgnummer;
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
      <MoteArbeidstakerColumns mote={mote} />
      <TruncatedTableColumn>{virksomhetsNavn()}</TruncatedTableColumn>
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default Mote;
