export const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Møtetidspunkt bekreftet',
    OPPRETTET: 'Ikke svart',
    SVAR_MOTTATT: 'Svar mottatt',
};

export const svarStatuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Bekreftet',
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
        svarStatus = `${antallSvar}/${mote.deltakere.length} Svar`;
    }
    return svarStatus;
};
