import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { useVirksomhetQuery } from "@/data/virksomhet/virksomhetQueryHooks";
import { useVeilederQuery } from "@/data/veiledere/veilederQueryHooks";
import { Checkbox, Table } from "@navikt/ds-react";
import { getDialogmoteDato, statusTekst } from "@/utils/dialogmoterUtil";
import Moterespons from "@/components/Moterespons.tsx";
import { getDatoFraZulu } from "@/utils/dateUtil.ts";
import { useBrukerQuery } from "@/data/bruker/brukernavnQueryHooks.ts";
import BrukerLenke from "@/components/BrukerLenke.tsx";

const texts = {
  henter: "Henter...",
  henterNavn: "Henter navn...",
  navnNotFound: "Fant ikke navn",
  henterVirksomhet: "Henter virksomhet...",
  virksomhetNotFound: "Fant ikke virksomheten",
  henterVeileder: "Henter veileder...",
  veilederNotFound: "Fant ikke veileder",
};

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
    if (veilederQuery.isLoading) return texts.henterVeileder;
    return veilederQuery.data
      ? veilederQuery.data.fulltNavn()
      : texts.veilederNotFound;
  };

  function BrukersNavn({ personident }: { personident: string }) {
    const brukernavnQuery = useBrukerQuery(personident);

    if (brukernavnQuery.isLoading) {
      return <>{texts.henterNavn}</>;
    } else if (brukernavnQuery.data) {
      return <BrukerLenke fnr={personident} navn={brukernavnQuery.data.navn} />;
    } else {
      return <>{texts.navnNotFound}</>;
    }
  }

  const virksomhetsNavn = (): string => {
    if (virksomhetQuery.isLoading) {
      return texts.henterVirksomhet;
    } else if (virksomhetQuery.virksomhetsnavn) {
      return virksomhetQuery.virksomhetsnavn;
    } else {
      return texts.virksomhetNotFound;
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
      <Table.DataCell textSize="small">
        {mote.arbeidstaker.personIdent}
      </Table.DataCell>
      <Table.DataCell textSize="small">
        <BrukersNavn personident={mote.arbeidstaker.personIdent} />
      </Table.DataCell>
      <Table.DataCell textSize="small">{virksomhetsNavn()}</Table.DataCell>
      <Table.DataCell textSize="small">{statusTekst(mote)}</Table.DataCell>
      <Table.DataCell textSize="small" className="space-y-1 ">
        <Moterespons dialogmote={mote} />
      </Table.DataCell>
    </Table.Row>
  );
}
