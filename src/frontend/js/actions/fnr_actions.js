export function hentFnr(ident, moteUuid) {
    return {
        type: 'HENT_FNR_FORESPURT',
        ident,
        moteUuid,
    };
}

export function henterFnr() {
    return {
        type: 'HENTER_FNR',
    };
}

export function fnrHentet(data, moteUuid) {
    return {
        type: 'FNR_HENTET',
        data,
        moteUuid,
    };
}

export function hentFnrFeilet() {
    return {
        type: 'HENT_FNR_FEILET',
    };
}
