import React, { useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import { opprettetTidspunktDescCompareFn } from "../utils/moterUtil";
import { finnVeilederNavn } from "../utils";

import MoteEnhet from "./MoteEnhet";
import { useDispatch } from "react-redux";
import { overforMoter } from "../data/moter/moterEnhet_actions";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteStatusFilter } from "./MoteStatusFilter";

const MoteoversiktEnhet = () => {
  const [filterStatus, setFilterStatus] = useState("alle");
  const [filterVeileder, setFilterVeileder] = useState("alle");
  const dispatch = useDispatch();

  const { moterMarkertForOverforing, overtarMoter } = useOverforMoter();
  const {
    aktiveMoterMedStatusOgVeileder: moter,
    getStatuser,
    getVeiledere,
  } = useMoterEnhet();

  const getFiltrerteMoter = () => {
    if (filterStatus === "alle" && filterVeileder === "alle") {
      return moter;
    }

    return moter.filter((mote) => {
      const veileder =
        filterVeileder === "alle" ||
        finnVeilederNavn(mote.veileder) === filterVeileder;
      const status = filterStatus === "alle" || mote.status === filterStatus;
      return veileder && status;
    });
  };

  const filtrerteMoter = getFiltrerteMoter();

  return (
    <div>
      <div className="verktoylinje">
        <div className="verktoylinje__verktoy">
          <div className="verktoylinje__filter">
            <MoteStatusFilter
              moteStatuser={getStatuser()}
              onFilterChange={(changedFilter) => setFilterStatus(changedFilter)}
            />
          </div>
          <div className="verktoylinje__filter">
            <Select
              id="moteoversikt-filtrer"
              label="Filtrer på veileder"
              onChange={(e) => {
                setFilterVeileder(e.currentTarget.value);
              }}
            >
              <option value="alle">Vis alle</option>
              {getVeiledere().map((veileder, index) => (
                <option key={index} value={veileder}>
                  {veileder}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="moteoversikt">
        <MoteOversiktHeading moter={filtrerteMoter} />
        <table className="motetabell">
          <thead>
            <tr>
              <th scope="col">Velg</th>
              <th scope="col">Veileder</th>
              <th scope="col">Sykmeldt</th>
              <th scope="col">F.nr</th>
              <th scope="col">Sist endret</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtrerteMoter
              .sort(opprettetTidspunktDescCompareFn)
              .map((mote, index) => (
                <MoteEnhet key={index} mote={mote} />
              ))}
          </tbody>
        </table>
        <div className="knapperad">
          <Hovedknapp
            disabled={overtarMoter || moterMarkertForOverforing.length === 0}
            onClick={() => {
              dispatch(
                overforMoter({
                  moteUuidListe: moterMarkertForOverforing,
                })
              );
            }}
          >
            Overta møter
          </Hovedknapp>
        </div>
      </div>
    </div>
  );
};

export default MoteoversiktEnhet;
