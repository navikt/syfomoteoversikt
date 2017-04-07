export function hentKontoretsMoter(enhet) {
    return {
        type: 'HENT_KONTORETSMOTER',
        enhet,
    };
}

export function henterKontoretsMoter() {
    return {
        type: 'HENTER_KONTORETSMOTER',
    };
}

export function kontoretsMoterHentet(data) {
    return {
        type: 'KONTORETSMOTER_HENTET',
        data,
    };
}

export function hentKontoretsMoterFeilet() {
    return {
        type: 'HENT_KONTORETSMOTER_FEILET',
    };
}
