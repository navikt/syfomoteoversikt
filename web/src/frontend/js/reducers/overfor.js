const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
};

export default function overfor(state = defaultState, action) {
    switch (action.type) {
        case 'MARKER_MOTE_FOR_OVERFORING' : {
            if (!action.overta) {
                const data = state.data
                    .filter((mote) => {
                        return mote.moteUuid !== action.moteUuid;
                    });
                return Object.assign({}, state, {
                    data,
                });
            }
            state.data.push({
                moteUuid: action.moteUuid,
            });
            return state;
        }
        default: {
            return state;
        }
    }
}
