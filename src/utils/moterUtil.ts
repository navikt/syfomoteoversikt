import { MoteDeltakerDTO, MoteDTO, MoteStatus } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import {
  getDialogmoteDato,
  getDialogmoteRespons,
  isDialogmote,
} from "./dialogmoterUtil";
import { MoteRespons } from "@/components/MoteResponsFilter";

export enum MoteType {
  INNKALLING = "Innkalling",
  PLANLEGGER = "Planlegger",
}

export const moteStatusTekst = (mote: MoteDTO): string => {
  const prefix = "Planlegger:";
  switch (mote.status) {
    case MoteStatus.OPPRETTET: {
      return `${prefix} Forslag sendt`;
    }
    case MoteStatus.BEKREFTET: {
      return `${prefix} Bekreftelse sendt`;
    }
    case MoteStatus.FLERE_TIDSPUNKT: {
      return `${prefix} Endring sendt`;
    }
    case MoteStatus.AVBRUTT: {
      return `${prefix} Avbrutt`;
    }
  }
};

export const antallDeltakerSvarTekst = (mote: MoteDTO): string => {
  if (
    mote.status === MoteStatus.BEKREFTET ||
    mote.status === MoteStatus.AVBRUTT
  ) {
    return "";
  }

  const antallSvar = mote.deltakere.filter((deltaker) =>
    harDeltakerSvart(mote, deltaker)
  ).length;
  return `${antallSvar}/${mote.deltakere.length} svar`;
};

const harDeltakerSvart = (mote: MoteDTO, deltaker: MoteDeltakerDTO) =>
  deltaker.svartidspunkt &&
  new Date(deltaker.svartidspunkt) >= new Date(mote.sistEndret);

export const getMoteRespons = (mote: MoteDTO | DialogmoterDTO): MoteRespons => {
  if (isDialogmote(mote)) {
    return getDialogmoteRespons(mote);
  } else {
    return erSvarMottatt(mote) ? MoteRespons.MOTTATT : MoteRespons.IKKE_MOTTATT;
  }
};

export const getMoteType = (mote: MoteDTO | DialogmoterDTO): MoteType => {
  if (isDialogmote(mote)) {
    return MoteType.INNKALLING;
  }
  return MoteType.PLANLEGGER;
};

const erSvarMottatt = (mote: MoteDTO): boolean =>
  mote.deltakere.some((deltaker) => !!deltaker.svartidspunkt);

export const getMoteResponser = (
  moter: (MoteDTO | DialogmoterDTO)[]
): MoteRespons[] => [...new Set(moter.map((mote) => getMoteRespons(mote)))];

export const ikkeAvbrutt =
  (): ((mote: MoteDTO) => boolean) => (mote: MoteDTO) =>
    mote.status !== MoteStatus.AVBRUTT;

export const findDeltakerByType = (
  mote: MoteDTO,
  type: "BRUKER" | "ARBEIDSGIVER"
) => mote.deltakere.find((deltaker) => deltaker.type.toUpperCase() === type);

export const compareByMotedato =
  (): ((a: MoteDTO | DialogmoterDTO, b: MoteDTO | DialogmoterDTO) => number) =>
  (a: MoteDTO | DialogmoterDTO, b: MoteDTO | DialogmoterDTO) => {
    const moteDatoA = getMoteDato(a);
    const moteDatoB = getMoteDato(b);
    if (moteDatoA > moteDatoB) {
      return 1;
    }
    if (moteDatoA < moteDatoB) {
      return -1;
    }
    return 0;
  };

export const getMoteDato = (mote: MoteDTO | DialogmoterDTO) => {
  if (isDialogmote(mote)) {
    return getDialogmoteDato(mote);
  } else {
    return (
      mote.bekreftetAlternativ?.tid ||
      mote.alternativer.map((alternativ) => alternativ.tid).sort()[0]
    );
  }
};
