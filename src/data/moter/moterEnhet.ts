import {
  BRUKER_HENTET,
  BrukerActions,
  HENT_BRUKER_FEILET,
} from "../bruker/bruker_actions";
import { MoteDTO } from "./moterTypes";
import { Reducer } from "redux";
import {
  ENHETSMOTER_HENTET,
  HENT_ENHETSMOTER_FEILET,
  HENTER_ENHETSMOTER,
  MoterEnhetActions,
  SET_AKTIV_ENHET,
} from "./moterEnhet_actions";
import { FNR_HENTET, FnrActions } from "../fnr/fnr_actions";
import {
  HENT_VEILEDER_FEILET,
  HENTER_VEILEDER,
  VEILEDER_HENTET,
  VeilederActions,
} from "../veiledere/veileder_actions";
import { getDeltagereMedFnr, getDeltagereMedNavn } from "../../utils/moterUtil";

interface MoterEnhetState {
  henter: boolean;
  hentingFeilet: boolean;
  aktivEnhet: string;
  hentetEnhet: string;
  data: MoteDTO[];
}

const defaultState: MoterEnhetState = {
  data: [],
  henter: false,
  hentingFeilet: false,
  aktivEnhet: "",
  hentetEnhet: "",
};

type MoterEnhetReducerAction =
  | MoterEnhetActions
  | FnrActions
  | BrukerActions
  | VeilederActions;

const moterEnhet: Reducer<MoterEnhetState, MoterEnhetReducerAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case HENTER_ENHETSMOTER: {
      return {
        ...state,
        data: [],
        henter: true,
        hentingFeilet: false,
        hentetEnhet: action.enhet,
      };
    }
    case SET_AKTIV_ENHET: {
      return {
        ...state,
        aktivEnhet: action.enhet,
      };
    }
    case ENHETSMOTER_HENTET: {
      return {
        ...state,
        data: action.data,
        henter: false,
        hentingFeilet: false,
      };
    }
    case HENT_ENHETSMOTER_FEILET: {
      return {
        ...state,
        data: [],
        henter: false,
        hentingFeilet: true,
      };
    }
    case FNR_HENTET: {
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = getDeltagereMedFnr(mote, action.data);
        return { ...mote, deltakere };
      });
      return {
        ...state,
        data,
      };
    }
    case BRUKER_HENTET: {
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = getDeltagereMedNavn(mote, action.data);
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

    case HENTER_VEILEDER: {
      return {
        ...state,
        data: state.data,
      };
    }
    case VEILEDER_HENTET: {
      const data = state.data.map((mote) => {
        if (mote.eier !== action.data.ident) {
          return mote;
        }
        return {
          ...mote,
          veileder: { ...action.data },
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
    default: {
      return state;
    }
  }
};

export default moterEnhet;
