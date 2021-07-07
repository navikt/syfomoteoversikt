import React, { ReactElement, useState } from "react";
import Mote from "./Mote";
import { useMoter } from "../hooks/useMoter";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteRespons, MoteResponsFilter } from "./MoteResponsFilter";
import {
  compareByMotedato,
  getMoteRespons,
  getMoteResponser,
} from "../utils/moterUtil";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";

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
  const { aktiveMoter } = useMoter();
  const { veiledersAktiveDialogmoter } = useDialogmoter();
  const moter = [...aktiveMoter, ...veiledersAktiveDialogmoter];

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
              <th scope="col">{texts.motedato}</th>
              <th scope="col">{texts.fnr}</th>
              <th scope="col">{texts.navn}</th>
              <th scope="col">{texts.virksomhet}</th>
              <th scope="col">{texts.status}</th>
              <th scope="col">{texts.respons}</th>
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
