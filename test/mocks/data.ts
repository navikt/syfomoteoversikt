import { BrukerFnrMedNavnDTO } from "@/data/bruker/BrukerFnrMedNavnDTO";
import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import { VirksomhetDTO } from "@/data/virksomhet/VirksomhetDTO";
import { VeilederDto } from "@/data/veiledere/veilederTypes";

export const aktivEnhetMock = "0316";
export const brukerFnr = "10108000398";
export const orgnr = "974574861";
export const virksomhetNavn = "Skomaker Andersen";
export const brukerNavn = "Arne Arbeidstaker";
export const brukernavnMock: BrukerFnrMedNavnDTO = {
  fnr: "",
  navn: brukerNavn,
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
  arbeidstakerRespons: { lestDato?: Date; svar?: SvarType } = {},
  arbeidsgiverRespons: { lestDato?: Date; svar?: SvarType } = {},
  behandlerRespons?: SvarType
): DialogmoterDTO =>
  ({
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
          lestDato: arbeidsgiverRespons?.lestDato?.toISOString() ?? null,
          svar: arbeidsgiverRespons.svar
            ? { svarType: arbeidsgiverRespons.svar }
            : null,
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
          lestDato: arbeidstakerRespons?.lestDato?.toISOString() ?? null,
          svar: arbeidstakerRespons.svar
            ? { svarType: arbeidstakerRespons.svar }
            : null,
        },
      ],
      personIdent: arbeidstakerMock.fnr,
      navn: arbeidstakerMock.navn,
    },
    ...(behandlerRespons
      ? {
          behandler: {
            varselList: [
              {
                varselType:
                  DialogmoteStatus.INNKALT === status
                    ? DialogmoteDeltakerVarselType.INNKALT
                    : DialogmoteDeltakerVarselType.NYTT_TID_STED,
                svar: [{ svarType: behandlerRespons }],
              },
            ],
          },
        }
      : {}),
    tid: dato.toISOString(),
    tildeltVeilederIdent: veileder.ident,
  } as unknown as DialogmoterDTO);
