import { VeilederDto } from "./veilederTypes";
import { Reducer } from "redux";
import {
  HENT_VEILEDER_FEILET,
  HENTER_VEILEDER,
  SET_AKTIV_VEILEDER,
  VEILEDER_HENTET,
  VeilederActions,
} from "./veileder_actions";

export interface VeiledereState {
  data: VeilederDto[];
  aktivVeileder: string;
}

const defaultState: VeiledereState = {
  data: [],
  aktivVeileder: "",
};

const veiledere: Reducer<VeiledereState, VeilederActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case HENTER_VEILEDER: {
      const veiledere = state.data;
      const eksisterendeVeileder = veiledere.find(
        (veileder) => veileder.ident === action.data.ident
      );
      if (eksisterendeVeileder) {
        return state;
      }
      return {
        ...state,
        data: [
          ...state.data,
          {
            ident: action.data.ident,
            henter: true,
            hentingFeilet: false,
          },
        ],
      };
    }
    case VEILEDER_HENTET: {
      const data = state.data.map((veileder) => {
        if (veileder.ident === action.data.ident) {
          return {
            ...veileder,
            navn: action.data.navn,
            hentingFeilet: false,
            henter: false,
          };
        }
        return veileder;
      });
      return {
        ...state,
        data,
      };
    }
    case HENT_VEILEDER_FEILET: {
      const data = state.data.map((veileder) => {
        if (veileder.ident === action.data.ident) {
          return {
            ...veileder,
            hentingFeilet: true,
            henter: false,
          };
        }
        return veileder;
      });
      return {
        ...state,
        data,
      };
    }
    case SET_AKTIV_VEILEDER: {
      return {
        ...state,
        aktivVeileder: action.veileder,
      };
    }
    default: {
      return state;
    }
  }
};

export default veiledere;
