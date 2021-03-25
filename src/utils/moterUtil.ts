import { MoteDeltakerDTO, MoteDTO } from "../data/moter/moterTypes";

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

const harDeltakerSvart = (mote: MoteDTO, deltaker: MoteDeltakerDTO) => {
  return (
    deltaker.svartidspunkt &&
    new Date(deltaker.svartidspunkt) >= new Date(mote.sistEndret)
  );
};

export const deltakerSvarStatus = (mote: MoteDTO) => {
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

export const erSvarMottatt = (mote: MoteDTO) =>
  mote.deltakere.some((deltaker) => deltaker.svar.some((svar) => svar.valgt));

export const setMoteStatus = (mote: MoteDTO) => {
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

export const ikkeAvbrutt = () => (mote: MoteDTO) => mote.status !== "AVBRUTT";

export const getBruker = (mote: MoteDTO) =>
  mote.deltakere.find((deltaker) => deltaker.type.toUpperCase() === "BRUKER");

export const getLeder = (mote: MoteDTO) =>
  mote.deltakere.find(
    (deltaker) => deltaker.type.toUpperCase() === "ARBEIDSGIVER"
  );

export const getStatuser = (moterMedStatus: MoteDTO[]) => [
  ...new Set(moterMedStatus.map((mote) => mote.status)),
];

export const compareByOpprettetTidspunktDesc = () => (
  a: MoteDTO,
  b: MoteDTO
) => {
  if (a.opprettetTidspunkt > b.opprettetTidspunkt) {
    return -1;
  }
  if (a.opprettetTidspunkt < b.opprettetTidspunkt) {
    return 1;
  }
  return 0;
};
