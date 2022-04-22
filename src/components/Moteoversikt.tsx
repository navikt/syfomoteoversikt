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
import { useVeiledersMoterQuery } from "@/data/moter/moterQueryHooks";
import { useDialogmoterVeilederidentQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";

const texts = {
  motedato: "Møtedato",
  fnr: "F.nr",
  navn: "Navn",
  virksomhet: "Virksomhet",
  status: "Status",
  respons: "Respons",
};

const Moteoversikt = (): ReactElement => {
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const moterQuery = useVeiledersMoterQuery();
  const dialogmoterQuery = useDialogmoterVeilederidentQuery();

  const moter = [...(moterQuery.data || []), ...(dialogmoterQuery.data || [])];

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle") {
      return moter;
    }
    return moter.filter((value) => getMoteRespons(value) === responsFilter);
  };

  const filtrerteMoter = getFiltrerteMoter();

  return (
    <div>
      <div className="verktoylinje">
        <div className="verktoylinje__verktoy">
          <div className="verktoylinje__filter">
            <MoteResponsFilter
              moteResponser={getMoteResponser(moter)}
              onFilterChange={(changedFilter: MoteRespons) =>
                setResponsFilter(changedFilter)
              }
            />
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Moteoversikt;
