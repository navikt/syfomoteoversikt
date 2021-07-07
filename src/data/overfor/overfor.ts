import { Reducer } from "redux";
import {
  ANTALL_DIALOGMOTER_OVERFORT_RESET,
  ANTALL_MOTER_OVERFORT_RESET,
  DIALOGMOTER_OVERFORT,
  MARKER_DIALOGMOTE_FOR_OVERFORING,
  MARKER_MOTE_FOR_OVERFORING,
  MOTER_OVERFORT,
  OVERFOR_DIALOGMOTER_FEILET,
  OVERFOR_DIALOGMOTER_RESET,
  OVERFOR_MOTER_FEILET,
  OVERFOR_MOTER_RESET,
  OverforActions,
  OVERFORER_DIALOGMOTER,
  OVERFORER_MOTER,
} from "./overfor_actions";

export interface OverforMoterState {
  antallMoterOverfort?: number;
  antallDialogmoterOverfort?: number;
  moter: string[];
  dialogmoter: string[];
  overforerMoter: boolean;
  overforerDialogmoter: boolean;
  moterOverfort: boolean;
  dialogmoterOverfort: boolean;
  overforMoterFeilet: boolean;
  overforDialogmoterFeilet: boolean;
}

const defaultState: OverforMoterState = {
  moter: [],
  dialogmoter: [],
  overforerMoter: false,
  overforerDialogmoter: false,
  moterOverfort: false,
  dialogmoterOverfort: false,
  overforMoterFeilet: false,
  overforDialogmoterFeilet: false,
};

const overfor: Reducer<OverforMoterState, OverforActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case MARKER_MOTE_FOR_OVERFORING: {
      if (!action.overta) {
        return {
          ...state,
          moter: state.moter.filter((moteUuid) => moteUuid !== action.moteUuid),
        };
      }
      return {
        ...state,
        moter: [...state.moter, action.moteUuid],
      };
    }
    case MARKER_DIALOGMOTE_FOR_OVERFORING: {
      if (!action.overta) {
        return {
          ...state,
          dialogmoter: state.dialogmoter.filter(
            (dialogmoteUuid) => dialogmoteUuid !== action.dialogmoteUuid
          ),
        };
      }
      return {
        ...state,
        dialogmoter: [...state.dialogmoter, action.dialogmoteUuid],
      };
    }
    case OVERFOR_MOTER_FEILET: {
      return {
        ...state,
        overforerMoter: false,
        overforMoterFeilet: true,
        moterOverfort: false,
      };
    }
    case OVERFOR_DIALOGMOTER_FEILET: {
      return {
        ...state,
        overforerDialogmoter: false,
        overforDialogmoterFeilet: true,
        dialogmoterOverfort: false,
      };
    }
    case OVERFORER_MOTER: {
      return {
        ...state,
        overforerMoter: true,
        overforMoterFeilet: false,
        moterOverfort: false,
      };
    }
    case OVERFORER_DIALOGMOTER: {
      return {
        ...state,
        overforerDialogmoter: true,
        overforDialogmoterFeilet: false,
        dialogmoterOverfort: false,
      };
    }
    case MOTER_OVERFORT: {
      return {
        ...state,
        antallMoterOverfort: state.moter.length,
        overforerMoter: false,
        overforMoterFeilet: false,
        moterOverfort: true,
      };
    }
    case DIALOGMOTER_OVERFORT: {
      return {
        ...state,
        antallDialogmoterOverfort: state.dialogmoter.length,
        overforerDialogmoter: false,
        overforDialogmoterFeilet: false,
        dialogmoterOverfort: true,
      };
    }
    case ANTALL_MOTER_OVERFORT_RESET: {
      return {
        ...state,
        antallMoterOverfort: undefined,
      };
    }
    case ANTALL_DIALOGMOTER_OVERFORT_RESET: {
      return {
        ...state,
        antallDialogmoterOverfort: undefined,
      };
    }
    case OVERFOR_MOTER_RESET: {
      return {
        ...state,
        overforerMoter: false,
        overforMoterFeilet: false,
        moterOverfort: false,
        moter: [],
      };
    }
    case OVERFOR_DIALOGMOTER_RESET: {
      return {
        ...state,
        overforerDialogmoter: false,
        overforDialogmoterFeilet: false,
        dialogmoterOverfort: false,
        dialogmoter: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default overfor;
