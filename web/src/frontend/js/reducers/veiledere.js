const defaultState = {
    data: [],
};

export default function (state = defaultState, action = {}) {
    switch (action.type) {
        case 'HENTER_VEILEDER': {
            const veiledere = state.data;
            const eksisterendeVeileder = veiledere.filter((veileder) => {
                return veileder.ident === action.data.ident;
            })[0];
            if (eksisterendeVeileder) {
                return state;
            }
            return Object.assign({}, state, {
                data: [...state.data, {
                    ident: action.data.ident,
                    henter: true,
                    hentingFeilet: false,
                }],
            });
        }
        case 'VEILEDER_HENTET': {
            const data = state.data.map((veileder) => {
                if (veileder.ident === action.data.ident) {
                    return Object.assign({}, veileder, {
                        navn: action.data.navn,
                        hentingFeilet: false,
                        henter: false,
                    });
                }
                return veileder;
            });

            return Object.assign({}, state, {
                data,
            });
        }
        case 'HENT_VEILEDER_FEILET': {
            const data = state.data.map((veileder) => {
                if (veileder.ident === action.data.ident) {
                    return Object.assign({}, veileder, {
                        hentingFeilet: true,
                        henter: false,
                    });
                }
                return veileder;
            });

            return Object.assign({}, state, {
                data,
            });
        }
        default: {
            return state;
        }
    }
}
