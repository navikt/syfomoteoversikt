import React, { ReactElement, useState } from "react";
import { Select } from "nav-frontend-skjema";
import MoteEnhet from "./MoteEnhet";
import { MoteOversiktHeading } from "./MoteOversiktHeading";
import { MoteRespons, MoteResponsFilter } from "./MoteResponsFilter";
import {
  compareByMotedato,
  getMoteRespons,
  getMoteResponser,
} from "@/utils/moterUtil";
import { OverforMoterKnapp } from "./OverforMoterKnapp";
import { trackOnClick } from "@/amplitude/amplitude";
import {
  FnrHeader,
  MoteDatoHeader,
  ResponsHeader,
  StatusHeader,
  VelgMoteHeader,
} from "./MoteTable";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { isDialogmote } from "@/utils/dialogmoterUtil";
import {
  useEnhetensMoterQuery,
  useEnhetensMoterVeiledere,
} from "@/data/moter/moterQueryHooks";
import {
  useDialogmoterQuery,
  useDialogmoterVeiledere,
} from "@/data/dialogmoter/dialogmoterQueryHooks";

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

  const moterEnhetQuery = useEnhetensMoterQuery();
  const dialogmoterQuery = useDialogmoterQuery();
  const dialogmoterVeiledere = useDialogmoterVeiledere();
  const moterVeiledere = useEnhetensMoterVeiledere();
  const moter = [
    ...(moterEnhetQuery.data || []),
    ...(dialogmoterQuery.data || []),
  ];
  const veiledere = [...dialogmoterVeiledere, ...moterVeiledere];

  const navnPaaVeiledere = (): string[] => {
    return [
      ...new Set(
        veiledere
          .map((veileder) => veileder.navn)
          .filter((navn) => navn !== undefined) as string[]
      ),
    ];
  };

  const veilederNavnForMote = (
    mote: MoteDTO | DialogmoterDTO
  ): string | undefined =>
    veiledere.find(({ ident }) =>
      isDialogmote(mote)
        ? mote.tildeltVeilederIdent === ident
        : mote.eier === ident
    )?.navn;

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle" && filterVeileder === "alle") {
      return moter;
    }

    return moter.filter((mote) => {
      const veileder =
        filterVeileder === "alle" ||
        veilederNavnForMote(mote) === filterVeileder;
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
              {navnPaaVeiledere().map((veileder, index) => (
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
              <VelgMoteHeader scope="col">{texts.velg}</VelgMoteHeader>
              <MoteDatoHeader scope="col">{texts.motedato}</MoteDatoHeader>
              <th scope="col">{texts.veileder}</th>
              <FnrHeader scope="col">{texts.fnr}</FnrHeader>
              <th scope="col">{texts.sykmeldt}</th>
              <StatusHeader scope="col">{texts.status}</StatusHeader>
              <ResponsHeader scope="col">{texts.respons}</ResponsHeader>
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
