const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
};

export default function moter(state = defaultState, action) {
    switch (action.type) {
        case 'HENTER_MOTER': {
            return {
                data: [],
                sender: false,
                henter: true,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case 'MOTER_HENTET': {
            return {
                data: action.data,
                sender: false,
                henter: false,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case 'HENT_MOTER_FEILET': {
            return {
                data: [],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case 'HENTER_VIRKSOMHET': {
            return Object.assign({}, defaultState, {
                data: state.data,
            });
        }
        case 'VIRKSOMHET_HENTET': {
            const data = state.data
                .map((mote) => {
                    if (mote.moteUuid !== action.moteUuid) {
                        return mote;
                    }
                    const deltakere = mote.deltakere.map((deltaker) => {
                        if (deltaker.type !== 'arbeidsgiver') {
                            return deltaker;
                        }
                        return Object.assign({}, deltaker, {
                            virksomhet: action.data.navn,
                        });
                    });
                    return Object.assign({}, mote, { deltakere });
                });
            return Object.assign({}, defaultState, {
                data,
            });
        }
        case 'HENT_VIRKSOMHET_FEILET': {
            return Object.assign({}, defaultState, {
                data: state.data,
            });
        }

        default: {
            return state;
        }
    }
}
