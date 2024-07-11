import {
  DialogmotedeltakerBehandlerVarselDTO,
  DialogmotedeltakerVarselDTO,
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";

export type DeltakerRespons = { harLest: boolean; svar: SvarType | undefined };

export const erResponsMottatt = (dialogmote: DialogmoterDTO): boolean => {
  const { svar: arbeidstakerSvar } = getArbeidstakerRespons(dialogmote);
  const { svar: arbeidsgiverSvar } = getArbeidsgiverRespons(dialogmote);
  const behandlerSvar = getBehandlerRespons(dialogmote);

  return !!arbeidstakerSvar || !!arbeidsgiverSvar || !!behandlerSvar;
};

export const statusTekst = (mote: DialogmoterDTO): string => {
  const postfix = mote.behandler ? " (med behandler)" : "";
  if (getDialogmoteDato(mote) < new Date()) {
    return `Referat ikke sendt`;
  } else if (mote.status === DialogmoteStatus.INNKALT) {
    return `Innkalt${postfix}`;
  } else {
    return `Endring sendt${postfix}`;
  }
};

export const getDialogmoteDato = (dialogmote: DialogmoterDTO) =>
  new Date(dialogmote.tid);

export const getBehandlerRespons = (
  dialogmote: DialogmoterDTO
): SvarType | undefined => {
  const varselType = varselTypeFromStatus(dialogmote.status);
  const varsel: DialogmotedeltakerBehandlerVarselDTO | undefined =
    dialogmote.behandler?.varselList?.find(
      (varsel) => varsel.varselType === varselType
    );

  return varsel?.svar[0]?.svarType;
};

export const getArbeidsgiverRespons = (
  dialogmote: DialogmoterDTO
): DeltakerRespons => {
  return getDeltakerRespons(
    dialogmote.status,
    dialogmote.arbeidsgiver.varselList
  );
};

export const getArbeidstakerRespons = (
  dialogmote: DialogmoterDTO
): DeltakerRespons => {
  return getDeltakerRespons(
    dialogmote.status,
    dialogmote.arbeidstaker.varselList
  );
};

const getDeltakerRespons = (
  status: DialogmoteStatus,
  varselList: DialogmotedeltakerVarselDTO[]
): DeltakerRespons => {
  const latestVarsel = varselList.find(
    (varsel) => varsel.varselType === varselTypeFromStatus(status)
  );

  return {
    harLest: !!latestVarsel?.lestDato,
    svar: latestVarsel?.svar?.svarType ? latestVarsel.svar.svarType : undefined,
  };
};

const varselTypeFromStatus = (
  status: DialogmoteStatus
): DialogmoteDeltakerVarselType => {
  switch (status) {
    case DialogmoteStatus.INNKALT: {
      return DialogmoteDeltakerVarselType.INNKALT;
    }
    case DialogmoteStatus.NYTT_TID_STED: {
      return DialogmoteDeltakerVarselType.NYTT_TID_STED;
    }
    case DialogmoteStatus.AVLYST: {
      return DialogmoteDeltakerVarselType.AVLYST;
    }
    case DialogmoteStatus.FERDIGSTILT: {
      return DialogmoteDeltakerVarselType.REFERAT;
    }
    case DialogmoteStatus.LUKKET: {
      return DialogmoteDeltakerVarselType.INNKALT;
    }
  }
};
