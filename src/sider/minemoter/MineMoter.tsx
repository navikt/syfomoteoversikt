import React, { FormEvent, ReactElement, useState } from "react";
import { MoteOversiktHeading } from "../../components/MoteOversiktHeading";
import {
  MoteRespons,
  MoteResponsFilter,
} from "../../components/MoteResponsFilter";
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
} from "../../components/MoteTable";
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
import { trackEvent } from "@/amplitude/amplitude";
import { Veileder } from "@/data/veiledere/veilederTypes";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";

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
  aktivVeileder: Veileder;
  moter: DialogmoterDTO[];
}

const tallOrdFraTall = (tall: number): string | number => {
  switch (tall) {
    case 0: {
      return "null";
    }
    case 1: {
      return "ett";
    }
    case 2: {
      return "to";
    }
    case 3: {
      return "tre";
    }
    case 4: {
      return "fire";
    }
    case 5: {
      return "fem";
    }
    case 6: {
      return "seks";
    }
    case 7: {
      return "syv";
    }
    case 8: {
      return "åtte";
    }
    case 9: {
      return "ni";
    }
    case 10: {
      return "t1";
    }
    case 11: {
      return "elleve";
    }
    case 12: {
      return "tolv";
    }
    default: {
      return tall;
    }
  }
};

const hentTallordTekst = (tall: number) => {
  const tallord = tallOrdFraTall(tall);
  return tall === 1 ? `${tallord} nytt møte` : `${tallord} nye møter`;
};

const MineMoter = ({ aktivVeileder, moter }: Props): ReactElement => {
  const { aktivEnhet } = useAktivEnhet();
  const [responsFilter, setResponsFilter] = useState<MoteRespons | "alle">(
    "alle"
  );
  const veiledereFromEnhet = useGetVeiledere(aktivEnhet || "").data || [];
  const [veilederIdent, setVeilederIdent] = useState<string>();
  const [isAntallOverforVisible, setIsAntallOverforVisible] =
    useState<boolean>(true);
  const { antallOverfort } = useMoteoverforing();
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
    return veileder ? veileder.fulltNavn() : veilederIdent;
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
          setIsAntallOverforVisible(false);
          setVeilederIdent("");
          clearSelected();
          trackEvent("moter tildelt", {
            antall: `${requestBody.dialogmoteUuids.length}`,
          });
        },
      });
    }
    event.preventDefault();
  }

  return (
    <>
      {!harMoter ? (
        <Panel>
          <p>{texts.ingenMoter}</p>
        </Panel>
      ) : (
        <>
          {antallOverfort && isAntallOverforVisible && (
            <Alert size="small" variant="success" className="mb-8">
              <Label size="small">{`Du har lagt til ${hentTallordTekst(
                antallOverfort
              )}`}</Label>
              <br />
              <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
            </Alert>
          )}
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
                  {veileder.fulltNavn()}
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

export default MineMoter;
