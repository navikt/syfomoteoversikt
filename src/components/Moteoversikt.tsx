import React, { FormEvent, ReactElement, useState } from "react";
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
import {
  Alert,
  Button,
  ErrorMessage,
  Label,
  Panel,
  Select,
} from "@navikt/ds-react";
import { useGetVeiledere } from "@/data/veiledere/veilederQueryHooks";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import Mote from "@/components/Mote";
import { useTildelDialogmoter } from "@/data/dialogmoter/useTildelDialogmoter";
import {
  DialogmoterDTO,
  TildelDialogmoterRequestBody,
} from "@/data/dialogmoter/dialogmoterTypes";
import { useDialogmoterUuids } from "@/data/dialogmoter/useDialogmoterUuids";
import { VeilederDto, VeilederInfoDto } from "@/data/veiledere/veilederTypes";

const texts = {
  velgKolonneTittel: "Velg",
  assignMeetings: "Tildel møter",
  selectVeilederToAssignLabel: "Hvem vil du tildele møtene?",
  selectVeilederToAssignDefaultOption: "Velg veileder",
  missingVeilederIdent: "Velg veileder som skal tildeles møtene",
  noDialogmoterSelected: "Du må velge dialogmøter du ønsker å tildele.",
  moterTildelt: (antallMoterTildelt: number, tildeltVeileder: string) => {
    const meetingsSingularOrPlural = antallMoterTildelt > 1 ? "møter" : "møte";
    return `Du har tildelt ${antallMoterTildelt} ${meetingsSingularOrPlural} til ${tildeltVeileder}`;
  },
  ingenMoter: "Du har ingen aktive møter.",
  moteTildelingFeilet:
    "Det skjedde en feil slik at du ikke fikk tildelt dialogmøtene.",
  motedato: "Møtedato",
  fnr: "F.nr",
  navn: "Navn",
  virksomhet: "Virksomhet",
  status: "Status",
  respons: "Respons fra deltakere",
};

interface Props {
  aktivVeileder: VeilederInfoDto;
  moter: DialogmoterDTO[];
}

const Moteoversikt = ({ aktivVeileder, moter }: Props): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const veiledereFromEnhet = useGetVeiledere(aktivEnhet || "").data || [];
  const [veilederIdent, setVeilederIdent] = useState<string>();
  const {
    dialogmoterUuids,
    modifyDialogmoterUuids,
    isSelected,
    clearSelected,
  } = useDialogmoterUuids();
  const tildelDialogmoter = useTildelDialogmoter();
  const [isFormErrorsVisible, setFormErrorsVisible] = useState<boolean>(false);
  const harMoter = moter.some(
    ({ tildeltVeilederIdent }) => tildeltVeilederIdent === aktivVeileder.ident
  );

  function veilederNavn(veilederIdent: string): string {
    const veileder = veiledereFromEnhet.find(
      (veileder) => veileder.ident == veilederIdent
    );
    return veileder ? fulltNavn(veileder) : veilederIdent;
  }

  function fulltNavn(veileder: VeilederDto): string {
    return veileder.fornavn + " " + veileder.etternavn;
  }

  const getFiltrerteMoter = () => {
    if (responsFilter === "alle") {
      return moter;
    }
    return moter.filter((value) => getMoteRespons(value) === responsFilter);
  };

  const filtrerteMoter = getFiltrerteMoter();

  const isFormValid =
    veilederIdent && veilederIdent != "" && dialogmoterUuids.length > 0;

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    if (!isFormValid) {
      setFormErrorsVisible(true);
    } else {
      const requestBody: TildelDialogmoterRequestBody = {
        veilederIdent: veilederIdent,
        dialogmoteUuids: dialogmoterUuids,
      };
      tildelDialogmoter.mutate(requestBody, {
        onSuccess: () => {
          setFormErrorsVisible(false);
          setVeilederIdent("");
          clearSelected();
        },
      });
    }
    event.preventDefault();
  }

  return (
    <>
      {!harMoter && (
        <Panel>
          <p>{texts.ingenMoter}</p>
        </Panel>
      )}
      {harMoter && (
        <>
          <div className="flex mb-8">
            <MoteResponsFilter
              moteResponser={getMoteResponser(moter)}
              onFilterChange={(changedFilter: MoteRespons) =>
                setResponsFilter(changedFilter)
              }
            />
          </div>
          <form onSubmit={onSubmitHandler}>
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
                  <Mote
                    key={index}
                    mote={mote}
                    isMoteSelected={isSelected}
                    modifyDialogmoterUuids={modifyDialogmoterUuids}
                  />
                ))}
              </tbody>
            </table>
            <div className="mb-8">
              {isFormErrorsVisible && dialogmoterUuids.length == 0 && (
                <ErrorMessage>{texts.noDialogmoterSelected}</ErrorMessage>
              )}
            </div>
            <Select
              label={texts.selectVeilederToAssignLabel}
              className="mb-4 w-72"
              value={veilederIdent}
              onChange={(event) => setVeilederIdent(event.target.value)}
              error={
                isFormErrorsVisible &&
                (veilederIdent == undefined || veilederIdent == "") &&
                texts.missingVeilederIdent
              }
            >
              <option value="">
                {texts.selectVeilederToAssignDefaultOption}
              </option>
              {Array.from(veiledereFromEnhet).map((veileder, index) => (
                <option key={index} value={veileder.ident}>
                  {fulltNavn(veileder)}
                </option>
              ))}
            </Select>
            <Button
              loading={tildelDialogmoter.isPending}
              variant="primary"
              type="submit"
            >
              {texts.assignMeetings}
            </Button>
          </form>
        </>
      )}
      {tildelDialogmoter.isSuccess && (
        <Alert size="small" variant="success" className="mt-8 w-fit">
          <Label size="small">
            {texts.moterTildelt(
              tildelDialogmoter.variables.dialogmoteUuids.length,
              veilederNavn(tildelDialogmoter.variables.veilederIdent)
            )}
          </Label>
          <br />
        </Alert>
      )}
      {tildelDialogmoter.isError && (
        <Alert size="small" variant="error" className="mt-8 w-fit">
          <Label size="small">{texts.moteTildelingFeilet}</Label>
          <br />
        </Alert>
      )}
    </>
  );
};

export default Moteoversikt;
