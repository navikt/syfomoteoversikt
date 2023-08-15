import React, { ReactElement, useState } from "react";
import Mote from "./Mote";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteRespons, MoteResponsFilter } from "./MoteResponsFilter";
import {
  compareByMotedato,
  getMoteRespons,
  getMoteResponser,
} from "@/utils/moterUtil";
import {
  FnrHeader,
  MoteDatoHeader,
  ResponsHeader,
  StatusHeader,
} from "./MoteTable";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { Verktoylinje } from "@/components/Verktoylinje";

const texts = {
  motedato: "Møtedato",
  fnr: "F.nr",
  navn: "Navn",
  virksomhet: "Virksomhet",
  status: "Status",
  respons: "Respons fra deltakere",
};

const Moteoversikt = (): ReactElement => {
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const dialogmoterQuery = useMineDialogmoterQuery();

  const moter = [...(dialogmoterQuery.data || [])];

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle") {
      return moter;
    }
    return moter.filter((value) => getMoteRespons(value) === responsFilter);
  };

  const filtrerteMoter = getFiltrerteMoter();

  return (
    <>
      <Verktoylinje>
        <MoteResponsFilter
          moteResponser={getMoteResponser(moter)}
          onFilterChange={(changedFilter: MoteRespons) =>
            setResponsFilter(changedFilter)
          }
        />
      </Verktoylinje>
      <div className="moteoversikt">
        <MoteOversiktHeading antallMoter={filtrerteMoter.length} />
        <table className="motetabell">
          <thead>
            <tr>
              <MoteDatoHeader scope="col">{texts.motedato}</MoteDatoHeader>
              <FnrHeader scope="col">{texts.fnr}</FnrHeader>
              <th scope="col">{texts.navn}</th>
              <th scope="col">{texts.virksomhet}</th>
              <StatusHeader scope="col">{texts.status}</StatusHeader>
              <ResponsHeader scope="col">{texts.respons}</ResponsHeader>
            </tr>
          </thead>
          <tbody>
            {filtrerteMoter.sort(compareByMotedato()).map((mote, index) => (
              <Mote key={index} mote={mote} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Moteoversikt;
