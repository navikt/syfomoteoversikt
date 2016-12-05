const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function (state = defaultState, action = {}) {
    switch (action.type) {
        case 'HENTER_VEILEDER': {
            return Object.assign({}, defaultState, {
                henter: true,
            });
        }
        case 'VEILEDER_HENTET': {
            return Object.assign({}, defaultState, {
                data: action.data,
            });
        }
        case 'HENT_VEILEDER_FEILET': {
            return Object.assign({}, defaultState, {
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
}
