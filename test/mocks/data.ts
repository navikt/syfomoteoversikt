import { BrukerinfoDTO } from "@/data/bruker/BrukerinfoDTO";
import { AktorDTO } from "@/data/bruker/AktorDTO";
import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
} from "@/data/dialogmoter/dialogmoterTypes";
import { MoteDTO, MoteStatus } from "@/data/moter/moterTypes";
import { daysFromToday } from "../testUtil";
import { VirksomhetDTO } from "@/data/virksomhet/VirksomhetDTO";
import { VeilederDto } from "@/data/veiledere/veilederTypes";

export const aktivEnhetMock = "0316";
export const brukerFnr = "10108000398";
export const orgnr = "974574861";
export const virksomhetNavn = "Skomaker Andersen";
export const brukerNavn = "Arne Arbeidstaker";
export const brukerMock: BrukerinfoDTO = {
  navn: brukerNavn,
};
export const aktorMock: AktorDTO = {
  fnr: brukerFnr,
};
export const arbeidstakerMock = {
  fnr: brukerFnr,
  navn: "Arne Arbeidstaker",
};
export const veilederMock = {
  ident: "Z990197",
  navn: "Vetle Veileder",
};
export const annenVeilederMock = {
  ident: "S123456",
  navn: "Dana Scully",
};
export const arbeidsgiverMock = {
  leder: "Korrupt Bolle",
  orgnummer: orgnr,
  virksomhet: virksomhetNavn,
};

export const virksomhetMock: VirksomhetDTO = {
  navn: virksomhetNavn,
};

export const createDialogmote = (
  veileder: VeilederDto,
  status: DialogmoteStatus,
  dato: Date,
  arbeidstakerSvar = false,
  arbeidsgiverSvar = false
): DialogmoterDTO =>
  (({
    sted: "video",
    status,
    arbeidsgiver: {
      virksomhetsnavn: arbeidsgiverMock.virksomhet,
      virksomhetsnummer: arbeidsgiverMock.orgnummer,
      varselList: [
        {
          varselType:
            DialogmoteStatus.INNKALT === status
              ? DialogmoteDeltakerVarselType.INNKALT
              : DialogmoteDeltakerVarselType.NYTT_TID_STED,
          lestDato: arbeidsgiverSvar ? new Date().toISOString() : null,
        },
      ],
    },
    arbeidstaker: {
      varselList: [
        {
          varselType:
            DialogmoteStatus.INNKALT === status
              ? DialogmoteDeltakerVarselType.INNKALT
              : DialogmoteDeltakerVarselType.NYTT_TID_STED,
          lestDato: arbeidstakerSvar ? new Date().toISOString() : null,
        },
      ],
      personIdent: arbeidstakerMock.fnr,
      navn: arbeidstakerMock.navn,
    },
    tid: dato.toISOString(),
    tildeltVeilederIdent: veileder.ident,
  } as unknown) as DialogmoterDTO);

export const createPlanlagtMote = (
  veileder: VeilederDto,
  status: MoteStatus,
  dato: Date,
  arbeidstakerSvar = false,
  arbeidsgiverSvar = false
): MoteDTO =>
  (({
    aktorId: arbeidstakerMock.fnr,
    status,
    sistEndret: daysFromToday(-3),
    deltakere: [
      {
        type: "BRUKER",
        fnr: arbeidstakerMock.fnr,
        navn: arbeidstakerMock.navn,
        svartidspunkt: arbeidstakerSvar ? new Date() : null,
      },
      {
        type: "ARBEIDSGIVER",
        svartidspunkt: arbeidsgiverSvar ? new Date() : null,
        navn: arbeidsgiverMock.leder,
        virksomhet: arbeidsgiverMock.virksomhet,
        orgnummer: arbeidsgiverMock.orgnummer,
      },
    ],
    bekreftetAlternativ: { tid: dato },
    alternativer: [{ tid: dato }],
    eier: veileder.ident,
  } as unknown) as MoteDTO);
