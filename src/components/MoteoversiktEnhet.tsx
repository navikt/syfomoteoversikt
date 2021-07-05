import React, { ReactElement, useState } from "react";
import { Select } from "nav-frontend-skjema";
import MoteEnhet from "./MoteEnhet";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteRespons, MoteResponsFilter } from "./MoteResponsFilter";
import {
  compareByMotedato,
  getMoteRespons,
  getMoteResponser,
} from "../utils/moterUtil";
import { useMoteVeileder } from "../hooks/useMoteVeileder";
import { OverforMoterKnapp } from "./OverforMoterKnapp";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";
import { trackOnClick } from "../amplitude/amplitude";

const texts = {
  velg: "Velg",
  motedato: "Møtedato",
  veileder: "Veileder",
  fnr: "F.nr",
  sykmeldt: "Sykmeldt",
  status: "Status",
  respons: "Respons",
  filtrer: "Filtrer på veileder",
};

const MoteoversiktEnhet = (): ReactElement => {
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const [filterVeileder, setFilterVeileder] = useState("alle");

  const { aktiveMoter } = useMoterEnhet();
  const { getVeileder } = useMoteVeileder();
  const { aktiveDialogmoter } = useDialogmoter();
  const moter = [...aktiveMoter, ...aktiveDialogmoter];

  const getVeilederNavnForMoter = (): string[] => {
    return [
      ...new Set(
        moter
          .map((mote) => getVeileder(mote)?.navn)
          .filter((navn) => navn !== undefined) as string[]
      ),
    ];
  };

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle" && filterVeileder === "alle") {
      return moter;
    }

    return moter.filter((mote) => {
      const veileder =
        filterVeileder === "alle" || getVeileder(mote)?.navn === filterVeileder;
      const status =
        responsFilter === "alle" || getMoteRespons(mote) === responsFilter;
      return veileder && status;
    });
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
          <div className="verktoylinje__filter">
            <Select
              id="moteoversikt-filtrer"
              label={texts.filtrer}
              onChange={(e) => {
                trackOnClick(texts.filtrer);
                setFilterVeileder(e.currentTarget.value);
              }}
            >
              <option value="alle">Vis alle</option>
              {getVeilederNavnForMoter().map((veileder, index) => (
                <option key={index} value={veileder}>
                  {veileder}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="moteoversikt">
        <MoteOversiktHeading antallMoter={filtrerteMoter.length} />
        <table className="motetabell">
          <thead>
            <tr>
              <th scope="col">{texts.velg}</th>
              <th scope="col">{texts.motedato}</th>
              <th scope="col">{texts.veileder}</th>
              <th scope="col">{texts.fnr}</th>
              <th scope="col">{texts.sykmeldt}</th>
              <th scope="col">{texts.status}</th>
              <th scope="col">{texts.respons}</th>
            </tr>
          </thead>
          <tbody>
            {filtrerteMoter.sort(compareByMotedato()).map((mote, index) => (
              <MoteEnhet key={index} mote={mote} />
            ))}
          </tbody>
        </table>
        <OverforMoterKnapp />
      </div>
    </div>
  );
};

export default MoteoversiktEnhet;
