export function hentEnhetsMoter(enhet) {
    return {
        type: 'HENT_ENHETSMOTER',
        enhet,
    };
}

export function setAktivEnhet(enhet) {
    return {
        type: 'SET_AKTIV_ENHET',
        enhet,
    };
}

export function henterEnhetsMoter(enhet) {
    return {
        type: 'HENTER_ENHETSMOTER',
        enhet,
    };
}

export function markerMoteForOverforing(moteUuid, overta) {
    return {
        type: 'MARKER_MOTE_FOR_OVERFORING',
        moteUuid,
        overta,
    };
}

export function overforMoter() {
    return {
        type: 'OVERFOR_MOTER_FORESPURT',
    };
}

export function overforerMoter() {
    return {
        type: 'OVERFORER_MOTER',
    };
}


export function overforMoterFeilet() {
    return {
        type: 'OVERFORER_MOTER_FEILET',
    };
}

export function moterOverfort() {
    return {
        type: 'MOTER_OVERFORT',
    };
}

export function enhetsMoterHentet(data) {
    return {
        type: 'ENHETSMOTER_HENTET',
        data,
    };
}

export function hentEnhetsMoterFeilet() {
    return {
        type: 'HENT_ENHETSMOTER_FEILET',
    };
}
