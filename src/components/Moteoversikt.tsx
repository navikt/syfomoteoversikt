import React, { useState } from "react";
import Mote from "./Mote";
import { useMoter } from "../hooks/useMoter";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteStatusFilter } from "./MoteStatusFilter";
import { compareByOpprettetTidspunktDesc } from "../utils/moterUtil";

const Moteoversikt = () => {
  const [filter, setFilter] = useState("alle");
  const { aktiveMoterMedStatus: moter, getStatuser } = useMoter();

  const getFiltrerteMoter = () =>
    filter === "alle" ? moter : moter.filter((mote) => mote.status === filter);

  const filtrerteMoter = getFiltrerteMoter();

  return (
    <div>
      <div className="verktoylinje">
        <div className="verktoylinje__verktoy">
          <div className="verktoylinje__filter">
            <MoteStatusFilter
              moteStatuser={getStatuser()}
              onFilterChange={(changedFilter: string) =>
                setFilter(changedFilter)
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
              <th scope="col">F.nr</th>
              <th scope="col">Navn</th>
              <th scope="col">Nærmeste leder</th>
              <th scope="col">Virksomhet</th>
              <th scope="col">Sist endret</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtrerteMoter
              .sort(compareByOpprettetTidspunktDesc())
              .map((mote, index) => (
                <Mote key={index} mote={mote} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Moteoversikt;
