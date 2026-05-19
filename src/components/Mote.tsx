import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { DialogmoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { Checkbox, Table } from "@navikt/ds-react";
import { getDialogmoteDato, statusTekst } from "@/utils/dialogmoterUtil";
import MoteresponsColumn from "@/components/MoteresponsColumn";
import { getDatoFraZulu } from "@/utils/dateUtil.ts";

interface Props {
  mote: DialogmoterDTO;
  isSelected: (moteUuid: string) => boolean;
  toggleSelected: (moteUuid: string) => void;
  showVeileder: boolean;
}

export default function Mote({
  mote,
  isSelected,
  toggleSelected,
  showVeileder,
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

  const moteDato = (mote: DialogmoterDTO): string => {
    const moteDato = getDialogmoteDato(mote);
    return moteDato ? getDatoFraZulu(moteDato) : "Mangler dato";
  };

  return (
    <Table.Row>
      <Table.DataCell>
        <Checkbox
          id={checkboxId}
          checked={isSelected(mote.uuid)}
          onChange={() => toggleSelected(mote.uuid)}
          value={mote.uuid}
        >
          {""}
        </Checkbox>
      </Table.DataCell>
      <Table.DataCell textSize="small">{moteDato(mote)}</Table.DataCell>
      {showVeileder && (
        <Table.DataCell textSize="small">{veilederNavn()}</Table.DataCell>
      )}
      <DialogmoteArbeidstakerColumns dialogmote={mote} />
      <Table.DataCell textSize="small">{virksomhetsNavn()}</Table.DataCell>
      <Table.DataCell textSize="small">{statusTekst(mote)}</Table.DataCell>
      <MoteresponsColumn dialogmote={mote} />
    </Table.Row>
  );
}
