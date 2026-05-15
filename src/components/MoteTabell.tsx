import React, { ReactElement } from "react";
import { Table } from "@navikt/ds-react";
import Mote from "./Mote";
import { compareByMotedato } from "@/utils/moterUtil";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";

const texts = {
  velg: "Velg",
  motedato: "Møtedato",
  veileder: "Veileder",
  fnr: "F.nr",
  virksomhet: "Virksomhet",
  sykmeldt: "Sykmeldt",
  status: "Status",
  respons: "Respons fra deltakere",
};

interface Props {
  moter: DialogmoterDTO[];
  isSelected: (uuid: string) => boolean;
  toggleSelected: (uuid: string) => void;
  showVeileder: boolean;
  showVirksomhet: boolean;
}

export default function MoteTabell({
  moter,
  isSelected,
  toggleSelected,
  showVeileder,
  showVirksomhet,
}: Props): ReactElement {
  return (
    <Table size="small" className="mb-8 bg-white">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">{texts.velg}</Table.HeaderCell>
          <Table.HeaderCell scope="col">{texts.motedato}</Table.HeaderCell>
          {showVeileder && (
            <Table.HeaderCell scope="col">{texts.veileder}</Table.HeaderCell>
          )}
          <Table.HeaderCell scope="col">{texts.fnr}</Table.HeaderCell>
          <Table.HeaderCell scope="col">{texts.sykmeldt}</Table.HeaderCell>
          {showVirksomhet && (
            <Table.HeaderCell scope="col">{texts.virksomhet}</Table.HeaderCell>
          )}
          <Table.HeaderCell scope="col">{texts.status}</Table.HeaderCell>
          <Table.HeaderCell scope="col">{texts.respons}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {moter.sort(compareByMotedato()).map((mote, index) => (
          <Mote
            key={index}
            mote={mote}
            isSelected={isSelected}
            toggleSelected={toggleSelected}
            showVeileder={showVeileder}
            showVirksomhet={showVirksomhet}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
