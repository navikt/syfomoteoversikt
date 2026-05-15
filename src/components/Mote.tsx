import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import {
  StatusColumn,
  TruncatedTableColumn,
  VelgMoteColumn,
} from "./MoteTable";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { MoteDato } from "./MoteDato";
import { Checkbox } from "@navikt/ds-react";
import { statusTekst } from "@/utils/dialogmoterUtil";
import MoteresponsColumn from "@/components/MoteresponsColumn";

interface Props {
  mote: DialogmoterDTO;
  isSelected: (moteUuid: string) => boolean;
  toggleSelected: (moteUuid: string) => void;
  showVeileder: boolean;
  showVirksomhet: boolean;
}

export default function Mote({
  mote,
  isSelected,
  toggleSelected,
  showVeileder,
  showVirksomhet,
}: Props): ReactElement {
  const virksomhetQuery = useVirksomhetQuery(
    mote.arbeidsgiver.virksomhetsnummer
  );
  const veilederQuery = useVeilederQuery(mote.tildeltVeilederIdent);

  const checkboxId = `dialogmote-${mote.uuid}`;

  const veilederNavn = (): string => {
    if (veilederQuery.isLoading) return "Henter navn...";
    return veilederQuery.data
      ? veilederQuery.data.fulltNavn()
      : "Fant ikke navn";
  };

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
          id={checkboxId}
          checked={isSelected(mote.uuid)}
          onChange={() => toggleSelected(mote.uuid)}
          value={mote.uuid}
        >
          {""}
        </Checkbox>
      </VelgMoteColumn>
      <MoteDato mote={mote} />
      {showVeileder && (
        <TruncatedTableColumn>{veilederNavn()}</TruncatedTableColumn>
      )}
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      {showVirksomhet && (
        <TruncatedTableColumn>{virksomhetsNavn()}</TruncatedTableColumn>
      )}
      <StatusColumn>{statusTekst(mote)}</StatusColumn>
      <MoteresponsColumn dialogmote={mote} />
    </tr>
  );
}
