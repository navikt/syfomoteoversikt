export function hentVeileder() {
    return {
        type: 'HENT_VEILEDER_FORESPURT',
    };
}

export function henterVeileder() {
    return {
        type: 'HENTER_VEILEDER',
    };
}

export function veilederHentet(data) {
    return {
        type: 'VEILEDER_HENTET',
        data,
    };
}

export function hentVeilederFeilet() {
    return {
        type: 'HENT_VEILEDER_FEILET',
    };
}
