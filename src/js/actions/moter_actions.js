export function hentMoter() {
    return {
        type: 'HENT_MOTER_FORESPURT',
    };
}

export function henterMoter() {
    return {
        type: 'HENTER_MOTER',
    };
}

export function moterHentet(data) {
    return {
        type: 'MOTER_HENTET',
        data,
    };
}

export function hentMoterFeilet() {
    return {
        type: 'HENT_MOTER_FEILET',
    };
}
