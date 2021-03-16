import {
  HENT_DIALOGMOTER_FEILET,
  HENT_DIALOGMOTER_HENTER,
  HENT_DIALOGMOTER_HENTET,
} from "./dialogmoter_actions";

interface DialogmotedeltakerArbeidstakerVarselDTO {
  uuid: string;
  createdAt: string;
  varselType: string;
  digitalt: boolean;
  pdf: Int8Array;
  lestDato: string | null;
}

interface DialogmotedeltakerArbeidstakerDTO {
  uuid: string;
  personIdent: string;
  type: string;
  varselList: DialogmotedeltakerArbeidstakerVarselDTO[];
}

interface DialogmotedeltakerArbeidsgiverDTO {
  uuid: string;
  virksomhetsnummer: string;
  lederNavn: string | null;
  lederEpost: string | null;
  type: string;
}

interface DialogmoteTidStedDTO {
  uuid: string;
  sted: string;
  tid: string;
}

export interface DialogmoterDTO {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  planlagtMoteUuid: string | null;
  planlagtMoteBekreftetTidspunkt: string | null;
  status: String;
  opprettetAv: String;
  tildeltVeilederIdent: String;
  tildeltEnhet: String;
  arbeidstaker: DialogmotedeltakerArbeidstakerDTO;
  arbeidsgiver: DialogmotedeltakerArbeidsgiverDTO;
  tidStedList: DialogmoteTidStedDTO[];
}

export interface DialogmoterState {
  henter: boolean;
  hentingFeilet: boolean;
  hentet: boolean;
  hentingForsokt: boolean;

  data: DialogmoterDTO[];
}

export const initialState: DialogmoterState = {
  henter: false,
  hentingFeilet: false,
  hentet: false,
  hentingForsokt: false,

  data: [],
};

const dialogmoter = (state = initialState, action = { type: "", data: [] }) => {
  switch (action.type) {
    case HENT_DIALOGMOTER_HENTER: {
      return {
        ...state,
        henter: true,
        hentingFeilet: false,
        hentet: false,
        hentingForsokt: true,
      };
    }
    case HENT_DIALOGMOTER_HENTET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: false,
        hentet: true,
        data: action.data,
        hentingForsokt: true,
      };
    }
    case HENT_DIALOGMOTER_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
        hentet: false,
        hentingForsokt: true,
      };
    }
    default:
      return state;
  }
};

export default dialogmoter;
