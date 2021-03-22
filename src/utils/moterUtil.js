export const statuser = {
  AVBRUTT: "Avbrutt",
  BEKREFTET: "Møtetidspunkt bekreftet",
  OPPRETTET: "Ikke svart",
  SVAR_MOTTATT: "Svar mottatt",
};

export const svarStatuser = {
  AVBRUTT: "Avbrutt",
  BEKREFTET: "Bekreftet",
};

const harDeltakerSvart = (mote, deltaker) => {
  return (
    deltaker.svartidspunkt &&
    new Date(deltaker.svartidspunkt) >= new Date(mote.sistEndret)
  );
};

export const deltakerSvarStatus = (mote) => {
  let svarStatus;
  if (mote.status === "BEKREFTET" || mote.status === "AVBRUTT") {
    svarStatus = svarStatuser[mote.status];
  } else {
    let antallSvar = 0;
    mote.deltakere.forEach((deltaker) => {
      if (harDeltakerSvart(mote, deltaker)) {
        antallSvar += 1;
      }
    });
    svarStatus = `${antallSvar}/${mote.deltakere.length} Svar`;
  }
  return svarStatus;
};

export const erSvarMottatt = (mote) => {
  let svar = mote.deltakere.map((deltaker) => {
    return deltaker.svar;
  });
  svar = [].concat.apply([], svar);
  const mottatteSvar = svar.filter((s) => {
    return s.valgt;
  });
  let mottatteAvvik = mote.deltakere.map((deltaker) => {
    return deltaker.avvik;
  });
  mottatteAvvik = [].concat.apply([], mottatteAvvik);
  return mottatteSvar.length > 0 || mottatteAvvik.length > 0;
};

export const setMoteStatus = (mote) => {
  if (mote.status === "BEKREFTET" || mote.status === "AVBRUTT") {
    return mote;
  }
  const svarMottatt = erSvarMottatt(mote);
  if (svarMottatt) {
    return Object.assign({}, mote, {
      status: "SVAR_MOTTATT",
    });
  }
  return mote;
};

export const ikkeAvbrutt = () => (mote) => mote.status !== "AVBRUTT";

export const getBruker = (mote) =>
  mote.deltakere.find((deltaker) => deltaker.type.toUpperCase() === "BRUKER");

export const getLeder = (mote) =>
  mote.deltakere.find(
    (deltaker) => deltaker.type.toUpperCase() === "ARBEIDSGIVER"
  );

export const getStatuser = (moterMedStatus) => [
  ...new Set(moterMedStatus.map((mote) => mote.status)),
];

export const opprettetTidspunktDescCompareFn = () => (moteA, moteB) => {
  if (moteA.opprettetTidspunkt > moteB.opprettetTidspunkt) {
    return -1;
  }
  if (moteA.opprettetTidspunkt < moteB.opprettetTidspunkt) {
    return 1;
  }
  return 0;
};
