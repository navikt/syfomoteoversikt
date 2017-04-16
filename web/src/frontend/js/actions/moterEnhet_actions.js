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
