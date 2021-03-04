import { BRUKER_HENTET, HENT_BRUKER_FEILET } from "../bruker/bruker_actions";

const defaultState = {
  data: [],
  henter: false,
  hentingFeilet: false,
  aktivEnhet: "",
  hentetEnhet: "",
};

export default function moterEnhet(state = defaultState, action) {
  switch (action.type) {
    case "HENTER_ENHETSMOTER": {
      return Object.assign({}, state, {
        data: [],
        henter: true,
        hentingFeilet: false,
        hentetEnhet: action.enhet,
      });
    }
    case "SET_AKTIV_ENHET": {
      return Object.assign({}, state, {
        aktivEnhet: action.enhet,
      });
    }
    case "ENHETSMOTER_HENTET": {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentingFeilet: false,
      });
    }
    case "HENT_ENHETSMOTER_FEILET": {
      return Object.assign({}, state, {
        data: [],
        henter: false,
        hentingFeilet: true,
      });
    }
    case "FNR_HENTET": {
      const data = state.data.map((mote) => {
        if (mote.moteUuid !== action.moteUuid) {
          return mote;
        }
        const deltakere = mote.deltakere.map((deltaker) => {
          if (deltaker.type !== "Bruker") {
            return deltaker;
          }
          return Object.assign({}, deltaker, {
            fnr: action.data,
          });
        });
        return Object.assign({}, mote, { deltakere });
      });
      return Object.assign({}, state, {
        data,
      });
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
          return Object.assign({}, deltaker, {
            navn: action.data.navn,
          });
        });
        return Object.assign({}, mote, { deltakere });
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case HENT_BRUKER_FEILET: {
      return Object.assign({}, state, {
        data: state.data,
      });
    }

    case "HENTER_VEILEDER": {
      return Object.assign({}, state, {
        data: state.data,
      });
    }
    case "VEILEDER_HENTET": {
      const data = state.data.map((mote) => {
        if (mote.eier !== action.data.ident) {
          return mote;
        }
        return Object.assign({}, mote, {
          veileder: { ...action.data },
        });
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case "HENT_VEILEDER_FEILET": {
      return Object.assign({}, state, {
        data: state.data,
      });
    }
    default: {
      return state;
    }
  }
}
