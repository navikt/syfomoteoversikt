import React, { ReactElement, useState } from "react";
import { Select } from "@navikt/ds-react";
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
  TH,
  VelgMoteHeader,
} from "./MoteTable";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import {
  useEnhetensDialogmoterQuery,
  useDialogmoterVeiledere,
} from "@/data/dialogmoter/dialogmoterQueryHooks";

const texts = {
  velg: "Velg",
  motedato: "Møtedato",
  veileder: "Veileder",
  fnr: "F.nr",
  sykmeldt: "Sykmeldt",
  status: "Status",
  respons: "Respons fra deltakere",
  filtrer: "Filtrer på veileder",
  filtrerType: "Filtrer på type",
};

const MoteoversiktEnhet = (): ReactElement => {
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );

  const [filterVeileder, setFilterVeileder] = useState("alle");

  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const dialogmoterVeiledere = useDialogmoterVeiledere();
  const moter = [...(dialogmoterQuery.data || [])];
  const veiledere = [...dialogmoterVeiledere];

  const navnPaaVeiledere = (): string[] => {
    return [
      ...new Set(
        veiledere
          .map((veileder) => veileder.navn)
          .filter((navn) => navn !== undefined) as string[]
      ),
    ];
  };

  const veilederNavnForMote = (mote: DialogmoterDTO): string | undefined =>
    veiledere.find(({ ident }) => mote.tildeltVeilederIdent === ident)?.navn;

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
    <>
      <div className="flex mb-8 gap-8">
        <MoteResponsFilter
          moteResponser={getMoteResponser(moter)}
          onFilterChange={(changedFilter: MoteRespons) =>
            setResponsFilter(changedFilter)
          }
        />
        <Select
          size="small"
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
      <div className="moteoversikt">
        <MoteOversiktHeading antallMoter={filtrerteMoter.length} />
        <table className="mb-8 w-full border-collapse table-fixed">
          <thead>
            <tr>
              <VelgMoteHeader scope="col">{texts.velg}</VelgMoteHeader>
              <MoteDatoHeader scope="col">{texts.motedato}</MoteDatoHeader>
              <TH scope="col">{texts.veileder}</TH>
              <FnrHeader scope="col">{texts.fnr}</FnrHeader>
              <TH scope="col">{texts.sykmeldt}</TH>
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
    </>
  );
};

export default MoteoversiktEnhet;
