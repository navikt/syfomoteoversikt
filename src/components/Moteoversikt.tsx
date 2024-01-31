import React, { ReactElement, useState } from "react";
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
  TH,
  VelgMoteHeader,
} from "./MoteTable";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { Button, ErrorMessage, Select } from "@navikt/ds-react";
import { useGetVeiledere } from "@/data/veiledere/veilederQueryHooks";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import Mote from "@/components/Mote";
import { useDialogmoterUuids } from "@/data/dialogmoter/useDialogmoterUuids";
import { useTildelDialogmoter } from "@/data/dialogmoter/useTildelDialogmoter";

const texts = {
  velgKolonneTittel: "Velg",
  assignMeetings: "Tildel møter",
  selectVeilederToAssignLabel: "Hvem vil du tildele møtene?",
  selectVeilederToAssignDefaultOption: "Velg veileder",
  missingVeilederIdent: "Vennligst velg veileder som skal tildeles møtene",
  noDialogmoterSelected: "Du må velge dialogmøter du ønsker å tildele.",
  motedato: "Møtedato",
  fnr: "F.nr",
  navn: "Navn",
  virksomhet: "Virksomhet",
  status: "Status",
  respons: "Respons fra deltakere",
};

const Moteoversikt = (): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const dialogmoterQuery = useMineDialogmoterQuery();
  // Figure out how to handle undefined
  const veiledereFromEnhet = useGetVeiledere(aktivEnhet || "").data || [];
  const [veilederIdent, setVeilederIdent] = useState<string>();
  const { dialogmoterUuids } = useDialogmoterUuids();
  const { isLoading } = useTildelDialogmoter();
  const moter = [...(dialogmoterQuery.data || [])];

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle") {
      return moter;
    }
    return moter.filter((value) => getMoteRespons(value) === responsFilter);
  };

  const filtrerteMoter = getFiltrerteMoter();

  function submitTildelingAvDialogmoter() {
    // Check veileder ident is not null
    // Check that dialogmoter is not empty
    // Send tildel request

    useTildelDialogmoter({
      veilederIdent = veilederIdent,
      dialogmoter = dialogmoterUuids,
    });
  }

  return (
    <>
      <div className="flex mb-8">
        <MoteResponsFilter
          moteResponser={getMoteResponser(moter)}
          onFilterChange={(changedFilter: MoteRespons) =>
            setResponsFilter(changedFilter)
          }
        />
      </div>
      <form onSubmit={submitTildelingAvDialogmoter}>
        <MoteOversiktHeading antallMoter={filtrerteMoter.length} />
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <VelgMoteHeader scope="col">
                {texts.velgKolonneTittel}
              </VelgMoteHeader>
              <MoteDatoHeader scope="col">{texts.motedato}</MoteDatoHeader>
              <FnrHeader scope="col">{texts.fnr}</FnrHeader>
              <TH scope="col">{texts.navn}</TH>
              <TH scope="col">{texts.virksomhet}</TH>
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
        <div className="mb-8">
          <ErrorMessage>{texts.noDialogmoterSelected}</ErrorMessage>
        </div>
        <Select
          label={texts.selectVeilederToAssignLabel}
          className="mb-4 w-72"
          value={veilederIdent}
          onChange={(event) => setVeilederIdent(event.target.value)}
          error={veilederIdent == "" && texts.missingVeilederIdent}
        >
          <option value="">{texts.selectVeilederToAssignDefaultOption}</option>
          {Array.from(veiledereFromEnhet).map((veileder, index) => (
            <option key={index} value={veileder.ident}>
              {veileder.fornavn + " " + veileder.etternavn}
            </option>
          ))}
        </Select>
        <Button variant="primary">{texts.assignMeetings}</Button>
      </form>
    </>
  );
};

export default Moteoversikt;
