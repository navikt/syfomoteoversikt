import React, { useState } from "react";
import { Select } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import { statuser } from "../utils/statuser";
import { finnVeilederNavn } from "../utils";

import MoteEnhet from "./MoteEnhet";
import { useDispatch } from "react-redux";
import { overforMoter } from "../data/moter/moterEnhet_actions";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";

const MoteoversiktEnhet = () => {
  const [filterStatus, setFilterStatus] = useState("alle");
  const [filterVeileder, setFilterVeileder] = useState("alle");
  const dispatch = useDispatch();

  const { moterMarkertForOverforing, overtarMoter } = useOverforMoter();
  const { aktiveMoterMedStatusOgVeileder: moter } = useMoterEnhet();

  const getStatuser = () => {
    const alleStatuser = moter.map((mote) => {
      return mote.status;
    });
    return [...new Set(alleStatuser)];
  };

  const getVeiledere = () => {
    const alleVeiledere = moter.map((mote) => {
      return finnVeilederNavn(mote.veileder);
    });
    return [...new Set(alleVeiledere)];
  };

  const getFiltrerteMoter = () => {
    if (filterStatus === "alle" && filterVeileder === "alle") {
      return moter;
    }

    return moter.filter((mote) => {
      let status = true;
      let veileder = true;
      if (filterStatus !== "alle") {
        status = mote.status === filterStatus;
      }
      if (filterVeileder !== "alle") {
        veileder = finnVeilederNavn(mote.veileder) === filterVeileder;
      }
      return veileder && status;
    });
  };

  const filtrerteMoter = getFiltrerteMoter();

  return (
    <div>
      <div className="verktoylinje">
        <div className="verktoylinje__verktoy">
          <div className="verktoylinje__filter">
            <Select
              id="moteoversikt-filtrer"
              label="Filtrer på status"
              onChange={(e) => {
                setFilterStatus(e.currentTarget.value);
              }}
            >
              <option value="alle">Vis alle</option>
              {getStatuser().map((status, index) => {
                return (
                  <option key={index} value={status}>
                    {statuser[status]}
                  </option>
                );
              })}
            </Select>
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
              {getVeiledere().map((veileder, index) => {
                return (
                  <option key={index} value={veileder}>
                    {veileder}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="moteoversikt">
        <h3 className="moteoversikt__meta">
          Viser {filtrerteMoter.length}{" "}
          {filtrerteMoter.length === 1 ? "møte" : "møter"}
        </h3>
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
              .sort((a, b) => {
                if (a.opprettetTidspunkt > b.opprettetTidspunkt) {
                  return -1;
                }
                if (a.opprettetTidspunkt < b.opprettetTidspunkt) {
                  return 1;
                }
                return 0;
              })
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
