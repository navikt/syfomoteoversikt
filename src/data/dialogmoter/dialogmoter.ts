import {
  DialogmoterActions,
  HENT_DIALOGMOTER_FEILET,
  HENT_DIALOGMOTER_HENTER,
  HENT_DIALOGMOTER_HENTET,
} from "./dialogmoter_actions";
import { Reducer } from "redux";
import {
  HENT_VIRKSOMHET_FEILET,
  HENTER_VIRKSOMHET,
  VIRKSOMHET_HENTET,
  VirksomhetActions,
} from "../virksomhet/virksomhet_actions";
import {
  BRUKER_HENTET,
  BrukerActions,
  HENT_BRUKER_FEILET,
  HENTER_BRUKER,
} from "../bruker/bruker_actions";
import {
  HENT_VEILEDER_FEILET,
  HENTER_VEILEDER,
  VEILEDER_HENTET,
  VeilederActions,
} from "../veiledere/veileder_actions";
import { DialogmoterDTO } from "./dialogmoterTypes";

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

type DialogmoterReducerActions =
  | DialogmoterActions
  | BrukerActions
  | VirksomhetActions
  | VeilederActions;

const dialogmoter: Reducer<DialogmoterState, DialogmoterReducerActions> = (
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
    case HENTER_VIRKSOMHET: {
      return {
        ...state,
        data: state.data,
      };
    }
    case VIRKSOMHET_HENTET: {
      const data = state.data.map((dialogmote) => {
        if (dialogmote.uuid !== action.moteUuid) {
          return dialogmote;
        }
        return {
          ...dialogmote,
          arbeidsgiver: {
            ...dialogmote.arbeidsgiver,
            virksomhetsnavn: action.data.navn,
          },
        };
      });
      return {
        ...state,
        data,
      };
    }
    case HENT_VIRKSOMHET_FEILET: {
      return {
        ...state,
        data: state.data,
      };
    }

    case HENTER_BRUKER: {
      return {
        ...state,
        data: state.data,
      };
    }
    case BRUKER_HENTET: {
      const data = state.data.map((dialogmote) => {
        if (dialogmote.uuid !== action.moteUuid) {
          return dialogmote;
        }
        return {
          ...dialogmote,
          arbeidstaker: {
            ...dialogmote.arbeidstaker,
            navn: action.data.navn,
          },
        };
      });
      return {
        ...state,
        data,
      };
    }
    case HENT_BRUKER_FEILET: {
      return {
        ...state,
        data: state.data,
      };
    }
    case HENTER_VEILEDER: {
      return {
        ...state,
        data: state.data,
      };
    }
    case VEILEDER_HENTET: {
      const data = state.data.map((dialogmote) => {
        if (dialogmote.tildeltVeilederIdent !== action.data.ident) {
          return dialogmote;
        }
        return {
          ...dialogmote,
          tildeltVeilederNavn: action.data.navn,
        };
      });
      return {
        ...state,
        data,
      };
    }
    case HENT_VEILEDER_FEILET: {
      return {
        ...state,
        data: state.data,
      };
    }
    default:
      return state;
  }
};

export default dialogmoter;
