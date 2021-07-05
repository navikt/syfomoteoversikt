import { Reducer } from "redux";
import { EnhetActions, SET_AKTIV_ENHET } from "./enhet_actions";

export interface EnhetState {
  aktivEnhet: string;
}

const defaultState: EnhetState = {
  aktivEnhet: "",
};

const enhet: Reducer<EnhetState, EnhetActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case SET_AKTIV_ENHET: {
      return {
        ...state,
        aktivEnhet: action.enhet,
      };
    }
    default: {
      return state;
    }
  }
};

export default enhet;
