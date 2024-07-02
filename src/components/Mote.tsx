import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import {
  StatusColumn,
  TruncatedTableColumn,
  VelgMoteColumn,
} from "./MoteTable";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { MoteDato } from "./MoteDato";
import { Checkbox } from "@navikt/ds-react";
import { statusTekst } from "@/utils/dialogmoterUtil";
import MoteresponsColumn from "@/components/MoteresponsColumn";

interface MoteProps {
  mote: DialogmoterDTO;
  modifyDialogmoterUuids: (dialogmoteUuid: string) => void;
  isMoteSelected: (moteUuid: string) => boolean;
}

const Mote = ({
  mote,
  modifyDialogmoterUuids,
  isMoteSelected,
}: MoteProps): ReactElement => {
  const virksomhetQuery = useVirksomhetQuery(
    mote.arbeidsgiver.virksomhetsnummer
  );

  const virksomhetsNavn = (): string => {
    if (virksomhetQuery.isLoading) {
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
          checked={isMoteSelected(mote.uuid)}
          onChange={(e) => modifyDialogmoterUuids(e.target.value)}
          value={mote.uuid}
        >
          {""}
        </Checkbox>
      </VelgMoteColumn>
      <MoteDato mote={mote} />
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <TruncatedTableColumn>{virksomhetsNavn()}</TruncatedTableColumn>
      <StatusColumn>{statusTekst(mote)}</StatusColumn>
      <MoteresponsColumn dialogmote={mote} />
    </tr>
  );
};

export default Mote;
