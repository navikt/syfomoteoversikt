import React, { ReactElement, useState } from "react";
import { BodyShort, Select } from "@navikt/ds-react";
import Mote from "./Mote";
import { MoteRespons, MoteResponsFilter } from "./MoteResponsFilter";
import {
  compareByMotedato,
  getMoteRespons,
  getMoteResponser,
} from "@/utils/moterUtil";
import { OverforMoter } from "./OverforMoter";
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
  useDialogmoterVeiledere,
  useEnhetensDialogmoterQuery,
} from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";

const texts = {
  velg: "Velg",
  motedato: "Møtedato",
  veileder: "Veileder",
  fnr: "F.nr",
  sykmeldt: "Sykmeldt",
  status: "Status",
  respons: "Respons fra deltakere",
  filtrer: "Filtrer på veileder",
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

  const { dialogmoterMarkert, dispatch } = useMoteoverforing();

  const isSelected = (uuid: string): boolean => {
    return dialogmoterMarkert.includes(uuid);
  };

  const toggleSelected = (uuid: string): void => {
    const isCurrentlySelected = dialogmoterMarkert.includes(uuid);
    dispatch({
      type: MoteoverforingActionType.MarkerDialogmote,
      dialogmoteUuid: uuid,
      overta: !isCurrentlySelected,
    });
  };

  const navnPaaVeiledere = (): string[] => {
    return veiledere
      .map((veileder) => veileder.fulltNavn())
      .filter((navn) => navn !== undefined) as string[];
  };

  const veilederNavnForMote = (mote: DialogmoterDTO): string | undefined => {
    const matchingVeileder = veiledere.find(
      ({ ident }) => mote.tildeltVeilederIdent === ident
    );
    return matchingVeileder?.fulltNavn();
  };

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
      <div className="flex items-center justify-between mb-2 bg-white sticky z-10 top-0 p-2 rounded shadow-[0_1px_3px_0px_rgba(0,0,0,0.5)]">
        <OverforMoter />
        <div className="flex gap-8 items-center">
          <Select
            size="small"
            id="moteoversikt-filtrer"
            label={texts.filtrer}
            onChange={(e) => setFilterVeileder(e.currentTarget.value)}
          >
            <option value="alle">Vis alle</option>
            {navnPaaVeiledere().map((veileder, index) => (
              <option key={index} value={veileder}>
                {veileder}
              </option>
            ))}
          </Select>
          <MoteResponsFilter
            moteResponser={getMoteResponser(moter)}
            onFilterChange={(changedFilter: MoteRespons) =>
              setResponsFilter(changedFilter)
            }
          />
          <BodyShort>
            <b>Viser {filtrerteMoter.length} møter</b>
          </BodyShort>
        </div>
      </div>
      <div className="moteoversikt">
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
              <Mote
                key={index}
                mote={mote}
                isSelected={isSelected}
                toggleSelected={toggleSelected}
                showVeileder={true}
                showVirksomhet={false}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MoteoversiktEnhet;
