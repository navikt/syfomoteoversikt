import { Reducer } from "redux";
import {
  MARKER_MOTE_FOR_OVERFORING,
  MOTER_OVERFORT,
  OVERFOR_MOTER_FEILET,
  OVERFOR_MOTER_RESET,
  OverforActions,
  OVERFORER_MOTER,
} from "./overfor_actions";

export interface OverforMoterState {
  data: string[];
  sender: boolean;
  sendt: boolean;
  sendingFeilet: boolean;
}

const defaultState: OverforMoterState = {
  data: [],
  sender: false,
  sendt: false,
  sendingFeilet: false,
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
          data: state.data.filter((moteUuid) => moteUuid !== action.moteUuid),
        };
      }
      return {
        ...state,
        data: [...state.data, action.moteUuid],
        sendt: false,
      };
    }
    case OVERFOR_MOTER_FEILET: {
      return {
        ...state,
        sender: false,
        sendingFeilet: true,
        sendt: true,
      };
    }
    case OVERFORER_MOTER: {
      return {
        ...state,
        sender: true,
        sendingFeilet: false,
        sendt: true,
      };
    }
    case MOTER_OVERFORT: {
      return {
        ...state,
        sender: false,
        sendingFeilet: false,
        sendt: true,
      };
    }
    case OVERFOR_MOTER_RESET: {
      return {
        ...state,
        sender: false,
        sendingFeilet: false,
        sendt: false,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default overfor;
