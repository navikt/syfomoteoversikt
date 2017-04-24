import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function ledetekster(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.LEDETEKSTER_HENTET:
            return {
                data: action.ledetekster,
                henter: false,
                hentingFeilet: false,
            };
        case actiontyper.HENTER_LEDETEKSTER:
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        case actiontyper.HENT_LEDETEKSTER_FEILET:
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        default:
            return state;
    }
}
