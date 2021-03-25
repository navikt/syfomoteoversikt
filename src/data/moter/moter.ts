import {
  HENT_VIRKSOMHET_FEILET,
  HENTER_VIRKSOMHET,
  VIRKSOMHET_HENTET,
  VirksomhetActions,
} from "../virksomhet/virksomhet_actions";
import { MoteDTO } from "./moterTypes";
import { Reducer } from "redux";
import {
  HENT_MOTER_FEILET,
  HENT_MOTER_HENTER,
  HENT_MOTER_HENTET,
  MoterActions,
} from "./moter_actions";
import {
  BRUKER_HENTET,
  BrukerActions,
  HENT_BRUKER_FEILET,
  HENTER_BRUKER,
} from "../bruker/bruker_actions";
import { FNR_HENTET, FnrActions } from "../fnr/fnr_actions";

interface MoterState {
  henter: boolean;
  hentingFeilet: boolean;
  sender: boolean;
  sendingFeilet: boolean;
  data: MoteDTO[];
}

const defaultState: MoterState = {
  data: [],
  henter: false,
  hentingFeilet: false,
  sender: false,
  sendingFeilet: false,
};

type MoterReducerAction =
  | MoterActions
  | BrukerActions
  | VirksomhetActions
  | FnrActions;

const moter: Reducer<MoterState> = (
  state = defaultState,
  action: MoterReducerAction
) => {
  switch (action.type) {
    case HENT_MOTER_HENTER: {
      return {
        data: [],
        sender: false,
        henter: true,
        hentingFeilet: false,
        sendingFeilet: false,
        avbryter: false,
        avbrytFeilet: false,
      };
    }
    case HENT_MOTER_HENTET: {
      return {
        data: action.data,
        sender: false,
        henter: false,
        hentingFeilet: false,
        sendingFeilet: false,
        avbryter: false,
        avbrytFeilet: false,
      };
    }
    case HENT_MOTER_FEILET: {
      return {
        data: [],
        sender: false,
        sendingFeilet: false,
        henter: false,
        hentingFeilet: true,
        avbryter: false,
        avbrytFeilet: false,
      };
    }
    case HENTER_VIRKSOMHET: {
      return {
        ...state,
        data: state.data,
      };
    }
    case VIRKSOMHET_HENTET: {
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = mote.deltakere.map((deltaker) => {
          if (deltaker.type !== "arbeidsgiver") {
            return deltaker;
          }
          return { ...deltaker, virksomhet: action.data.navn };
        });
        return { ...mote, deltakere };
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
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = mote.deltakere.map((deltaker) => {
          if (deltaker.type !== "Bruker") {
            return deltaker;
          }
          return {
            ...deltaker,
            navn: action.data.navn,
          };
        });
        return { ...mote, deltakere };
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
    case FNR_HENTET: {
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = mote.deltakere.map((deltaker) => {
          if (deltaker.type !== "Bruker") {
            return deltaker;
          }
          return {
            ...deltaker,
            fnr: action.data,
          };
        });
        return { ...mote, deltakere };
      });
      return {
        ...state,
        data,
      };
    }
    default: {
      return state;
    }
  }
};

export default moter;
