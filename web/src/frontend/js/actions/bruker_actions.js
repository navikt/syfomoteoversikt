export function hentBruker(fnr, moteUuid) {
    return {
        type: 'HENT_BRUKER_FORESPURT',
        fnr,
        moteUuid,
    };
}

export function henterBruker() {
    return {
        type: 'HENTER_BRUKER',
    };
}

export function brukerHentet(data, moteUuid) {
    return {
        type: 'BRUKER_HENTET',
        data,
        moteUuid,
    };
}

export function hentBrukerFeilet() {
    return {
        type: 'HENT_BRUKER_FEILET',
    };
}
