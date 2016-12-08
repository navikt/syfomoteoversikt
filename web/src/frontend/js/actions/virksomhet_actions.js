export function hentVirksomhet(orgnummer, moteUuid) {
    return {
        type: 'HENT_VIRKSOMHET_FORESPURT',
        orgnummer,
        moteUuid
    };
}

export function henterVirksomhet() {
    return {
        type: 'HENTER_VIRKSOMHET',
    };
}

export function virksomhetHentet(data, moteUuid) {
    return {
        type: 'VIRKSOMHET_HENTET',
        data,
        moteUuid
    };
}

export function hentVirksomhetFeilet() {
    return {
        type: 'HENT_VIRKSOMHET_FEILET',
    };
}
