import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { TruncatedTableColumn, VelgMoteColumn } from "./MoteTable";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { MoteDato } from "./MoteDato";
import { Checkbox } from "@navikt/ds-react";
import { useDialogmoterUuids } from "@/data/dialogmoter/useDialogmoterUuids";

interface MoteProps {
  mote: DialogmoterDTO;
}

const Mote = ({ mote }: MoteProps): ReactElement => {
  const virksomhetQuery = useVirksomhetQuery(
    mote.arbeidsgiver.virksomhetsnummer
  );
  const { modifyDialogmoterUuids, isSelected } = useDialogmoterUuids();

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
      <VelgMoteColumn>
        <Checkbox
          id="dialogmote"
          checked={isSelected(mote.uuid)}
          onChange={(e) => modifyDialogmoterUuids(e.target.value)}
          value={mote.uuid}
        >
          {""}
        </Checkbox>
      </VelgMoteColumn>
      <MoteDato mote={mote} />
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <TruncatedTableColumn>{virksomhetsNavn()}</TruncatedTableColumn>
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default Mote;
