const kortManeder = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

export const visDato = (dato) => {
    const maned = kortManeder[dato.monthValue - 1];
    return `${dato.dayOfMonth}. ${maned} ${dato.year}`;
};

export const lagNummer = (streng) => {
    return streng.replace(/[^\d.-]/g, '').replace(/-/g, '');
};

export const formaterDato = (input) => {
    const grupper = lagNummer(input).split('.');
    let dato = grupper.join('');
    if (dato.length > 2 || grupper.length > 1) {
        dato = dato.replace(/(.{2})/, '$1.');
        if (dato.length >= 6 || grupper.length > 2) {
            dato = dato.replace(/(.{5})/, '$1.');
        }
    }
    return dato;
};

export const formaterTid = (input) => {
    const grupper = lagNummer(input).split('.');
    const tid = grupper.join('');
    if (tid.length > 2 || grupper.length > 1) {
        return tid.replace(/(.{2})/, '$1.');
    }
    return tid;
};

export const pad = (nr) => {
    return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

export const getDatoFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    return `${getDatoFraZulu(zulutid)} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};


export const finnVirksomhet = (leder) => {
    if (leder && leder.virksomhet) {
        return leder.virksomhet;
    } else if (leder && leder.orgnummer) {
        return 'Henter virksomhet...';
    }
    return 'Fant ikke virksomheten';
};

export const finnNavn = (bruker) => {
    if (bruker && bruker.navn) {
        return bruker.navn;
    } else if (bruker && bruker.fnr) {
        return 'Henter navn...';
    }
    return 'Fant ikke navn';
};
