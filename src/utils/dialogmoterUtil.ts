import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
} from "../data/dialogmoter/dialogmoterTypes";
import { MoteRespons } from "../components/MoteResponsFilter";
import { MoteDTO } from "../data/moter/moterTypes";

export const isDialogmote = (
  mote: MoteDTO | DialogmoterDTO
): mote is DialogmoterDTO => (mote as DialogmoterDTO).sted !== undefined;

export const getDialogmoteRespons = (dialogmote: DialogmoterDTO): MoteRespons =>
  erLest(dialogmote) ? MoteRespons.MOTTATT : MoteRespons.IKKE_MOTTATT;

const erLest = (dialogmote: DialogmoterDTO): boolean => {
  const harLestVarsel = (type: DialogmoteDeltakerVarselType) =>
    harArbeidstakerLestVarsel(dialogmote, type) ||
    harArbeidsgiverLestVarsel(dialogmote, type);
  switch (dialogmote.status) {
    case DialogmoteStatus.INNKALT: {
      return harLestVarsel(DialogmoteDeltakerVarselType.INNKALT);
    }
    case DialogmoteStatus.NYTT_TID_STED: {
      return harLestVarsel(DialogmoteDeltakerVarselType.NYTT_TID_STED);
    }
    case DialogmoteStatus.AVLYST: {
      return harLestVarsel(DialogmoteDeltakerVarselType.AVLYST);
    }
    case DialogmoteStatus.FERDIGSTILT: {
      return harLestVarsel(DialogmoteDeltakerVarselType.REFERAT);
    }
  }
};

export const antallLesteVarslerTekst = (dialogmote: DialogmoterDTO): string => {
  let antallLest = 0;
  if (dialogmote.status === DialogmoteStatus.INNKALT) {
    antallLest = antallLesteVarsler(
      dialogmote,
      DialogmoteDeltakerVarselType.INNKALT
    );
  } else if (dialogmote.status === DialogmoteStatus.NYTT_TID_STED) {
    antallLest = antallLesteVarsler(
      dialogmote,
      DialogmoteDeltakerVarselType.NYTT_TID_STED
    );
  } else {
    return "";
  }
  return `${antallLest}/2 har lest`;
};

const antallLesteVarsler = (
  dialogmote: DialogmoterDTO,
  varselType: DialogmoteDeltakerVarselType
): number =>
  [
    harArbeidstakerLestVarsel(dialogmote, varselType),
    harArbeidsgiverLestVarsel(dialogmote, varselType),
  ].filter((erLest) => erLest).length;

export const dialogmoteStatusTekst = (mote: DialogmoterDTO): string => {
  const prefix = "Innkalling:";
  if (getDialogmoteDato(mote) < new Date()) {
    return `${prefix} Dato passert`;
  } else if (mote.status === DialogmoteStatus.INNKALT) {
    return `${prefix} Sendt`;
  } else {
    return `${prefix} Endret tid/sted`;
  }
};

export const getDialogmoteDato = (dialogmote: DialogmoterDTO) =>
  new Date(dialogmote.tid);

const harArbeidstakerLestVarsel = (
  dialogmote: DialogmoterDTO,
  varselType: DialogmoteDeltakerVarselType
): boolean =>
  dialogmote.arbeidstaker.varselList
    .filter((varsel) => varsel.varselType === varselType)
    .some((varsel) => !!varsel.lestDato);

const harArbeidsgiverLestVarsel = (
  dialogmote: DialogmoterDTO,
  varselType: DialogmoteDeltakerVarselType
): boolean =>
  dialogmote.arbeidsgiver.varselList
    .filter((varsel) => varsel.varselType === varselType)
    .some((varsel) => !!varsel.lestDato);
