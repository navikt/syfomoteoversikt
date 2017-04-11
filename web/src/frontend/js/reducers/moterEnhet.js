const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    enhetsMoter: false,
};

export default function moterEnhet(state = defaultState, action) {
    switch (action.type) {

        case 'HENTER_ENHETSMOTER' : {
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

        case 'ENHETSMOTER_HENTET' : {
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

        case 'HENT_ENHETSMOTER_FEILET' : {
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

        case 'BRUKER_HENTET': {
            const data = state.data
                .map((mote) => {
                    if (mote.moteUuid !== action.moteUuid) {
                        return mote;
                    }
                    const deltakere = mote.deltakere.map((deltaker) => {
                        if (deltaker.type !== 'Bruker') {
                            return deltaker;
                        }
                        return Object.assign({}, deltaker, {
                            navn: action.data.navn,
                        });
                    });
                    return Object.assign({}, mote, { deltakere });
                });
            return Object.assign({}, defaultState, {
                data,
            });
        }
        case 'HENT_BRUKER_FEILET': {
            return Object.assign({}, defaultState, {
                data: state.data,
            });
        }

        default: {
            return state;
        }
    }
}
