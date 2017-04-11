export function hentEnhetsMoter(enhet) {
    return {
        type: 'HENT_ENHETSMOTER',
        enhet,
    };
}

export function henterEnhetsMoter() {
    return {
        type: 'HENTER_ENHETSMOTER',
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
