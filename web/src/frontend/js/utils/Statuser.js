export const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Møtetidspunkt bekreftet',
    OPPRETTET: 'Ikke svart',
    SVAR_MOTTATT: 'Svar mottatt',
};

export const svarStatuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Bekreftet',
    INGEN_SVAR: '0/2 Svar',
    ETT_SVAR: '1/2 Svar',
    BEGGE_SVAR: '1/2 Svar',
};

export const deltakerSvarStatus = (mote) => {
    let svarStatus;
    if (mote.status === 'BEKREFTET' || mote.status === 'AVBRUTT') {
        svarStatus = svarStatuser[mote.status];
    } else {
        let antallSvar = 0;
        mote.deltakere.forEach((deltaker) => {
            if (deltaker.svar.some((svar) => {return svar.valgt;})) {
                antallSvar++;
            }
        });

        switch (antallSvar) {
            case 1:
                svarStatus = svarStatuser.ETT_SVAR;
                break;
            case 2:
                svarStatus = svarStatuser.BEGGE_SVAR;
                break;
            default:
                svarStatus = svarStatuser.INGEN_SVAR;
                break;
        }
    }
    return svarStatus;
};
