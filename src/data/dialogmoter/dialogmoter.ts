import {
  DialogmoterActions,
  HENT_DIALOGMOTER_FEILET,
  HENT_DIALOGMOTER_HENTER,
  HENT_DIALOGMOTER_HENTET,
} from "./dialogmoter_actions";
import { Reducer } from "redux";

export enum DialogmoteStatus {
  INNKALT = "INNKALT",
  AVLYST = "AVLYST",
  FERDIGSTILT = "FERDIGSTILT",
  NYTT_TID_STED = "NYTT_TID_STED",
}

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

export interface DialogmoterDTO {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  status: DialogmoteStatus;
  opprettetAv: string;
  tildeltVeilederIdent: string;
  tildeltEnhet: string;
  arbeidstaker: DialogmotedeltakerArbeidstakerDTO;
  arbeidsgiver: DialogmotedeltakerArbeidsgiverDTO;
  sted: string;
  tid: string;
}

export interface DialogmoterState {
  henter: boolean;
  hentingFeilet: boolean;
  hentet: boolean;
  hentetEnhet: string;
  data: DialogmoterDTO[];
}

export const initialState: DialogmoterState = {
  henter: false,
  hentingFeilet: false,
  hentet: false,
  hentetEnhet: "",
  data: [],
};

const dialogmoter: Reducer<DialogmoterState, DialogmoterActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HENT_DIALOGMOTER_HENTER: {
      return {
        ...state,
        henter: true,
        hentingFeilet: false,
        hentet: false,
      };
    }
    case HENT_DIALOGMOTER_HENTET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: false,
        hentet: true,
        data: action.data,
        hentetEnhet: action.enhet,
      };
    }
    case HENT_DIALOGMOTER_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
        hentet: false,
      };
    }
    default:
      return state;
  }
};

export default dialogmoter;
