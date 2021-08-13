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
import {
  getMoteDeltakereMedFnr,
  getMoteDeltakereMedNavn,
} from "@/utils/moterUtil";

export interface MoterState {
  henter: boolean;
  hentingFeilet: boolean;
  hentetMoter: boolean;
  sender: boolean;
  sendingFeilet: boolean;
  data: MoteDTO[];
}

const defaultState: MoterState = {
  data: [],
  henter: false,
  hentingFeilet: false,
  hentetMoter: true,
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
        ...state,
        henter: true,
        hentingFeilet: false,
        hentetMoter: false,
      };
    }
    case HENT_MOTER_HENTET: {
      return {
        ...state,
        data: action.data,
        henter: false,
        hentingFeilet: false,
        hentetMoter: true,
      };
    }
    case HENT_MOTER_FEILET: {
      return {
        ...state,
        data: [],
        henter: false,
        hentingFeilet: true,
        hentetMoter: false,
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
        const deltakere = getMoteDeltakereMedNavn(mote, action.data);
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
        const deltakere = getMoteDeltakereMedFnr(mote, action.data);
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
