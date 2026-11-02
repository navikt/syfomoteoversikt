import { BrukerFnrMedNavnDTO } from "@/data/bruker/BrukerFnrMedNavnDTO";
import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import { Veileder } from "@/data/veiledere/veilederTypes";
import { EregOrganisasjonResponseDTO } from "@/data/virksomhet/EregVirksomhetsnavn";

export const aktivEnhetMock = "0316";
export const brukerFnr = "10108000398";
export const orgnr = "974574861";
export const virksomhetNavn = "Skomaker Andersen, Oslo";
export const brukerNavn = "Arne Arbeidstaker";
export const brukernavnMock: BrukerFnrMedNavnDTO = {
  fnr: "",
  navn: brukerNavn,
};

export const arbeidstakerMock = {
  fnr: brukerFnr,
  navn: "Arne Arbeidstaker",
};
export const veilederMock = new Veileder("Z990197", "Vetle", "Veileder");

export const annenVeilederMock = new Veileder("S123456", "Dana", "Scully");

export const arbeidsgiverMock = {
  leder: "Korrupt Bolle",
  orgnummer: orgnr,
  virksomhet: virksomhetNavn,
};

export const eregOrganisasjonResponseMock: EregOrganisasjonResponseDTO = {
  navn: {
    navnelinje1: "Skomaker Andersen",
    redigertnavn: "Skomaker Andersen, Oslo",
  },
};

const varselTypeFromStatus = (status: DialogmoteStatus) => {
  switch (status) {
    case DialogmoteStatus.INNKALT:
      return DialogmoteDeltakerVarselType.INNKALT;
    case DialogmoteStatus.ENDRET:
      return DialogmoteDeltakerVarselType.ENDRET;
    default:
      return DialogmoteDeltakerVarselType.NYTT_TID_STED;
  }
};

export const createDialogmote = (
  veileder: Veileder,
  status: DialogmoteStatus,
  dato: Date,
  arbeidstakerRespons: { lestDato?: Date; svar?: SvarType } = {},
  arbeidsgiverRespons: { lestDato?: Date; svar?: SvarType } = {},
  behandlerRespons?: SvarType,
  behandlerVarselType?: DialogmoteDeltakerVarselType,
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
            varselTypeFromStatus(status),
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
            varselTypeFromStatus(status),
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
                  behandlerVarselType ?? varselTypeFromStatus(status),
                svar: [{ svarType: behandlerRespons }],
              },
            ],
          },
        }
      : {}),
    tid: dato.toISOString(),
    tildeltVeilederIdent: veileder.ident,
  }) as unknown as DialogmoterDTO;
