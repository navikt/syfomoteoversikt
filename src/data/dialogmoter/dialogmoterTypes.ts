export enum DialogmoteStatus {
  INNKALT = "INNKALT",
  AVLYST = "AVLYST",
  FERDIGSTILT = "FERDIGSTILT",
  NYTT_TID_STED = "NYTT_TID_STED",
}

export enum DialogmoteDeltakerVarselType {
  INNKALT = "INNKALT",
  NYTT_TID_STED = "NYTT_TID_STED",
  REFERAT = "REFERAT",
  AVLYST = "AVLYST",
}

export interface DialogmotedeltakerVarselDTO {
  uuid: string;
  createdAt: string;
  varselType: DialogmoteDeltakerVarselType;
  digitalt: boolean;
  lestDato?: string;
}

interface DialogmotedeltakerArbeidstakerDTO {
  uuid: string;
  personIdent: string;
  navn?: string;
  type: string;
  varselList: DialogmotedeltakerVarselDTO[];
}

interface DialogmotedeltakerArbeidsgiverDTO {
  uuid: string;
  virksomhetsnummer: string;
  virksomhetsnavn?: string;
  type: string;
  varselList: DialogmotedeltakerVarselDTO[];
}

export interface DialogmoterDTO {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  status: DialogmoteStatus;
  opprettetAv: string;
  tildeltVeilederIdent: string;
  tildeltVeilederNavn?: string;
  tildeltEnhet: string;
  arbeidstaker: DialogmotedeltakerArbeidstakerDTO;
  arbeidsgiver: DialogmotedeltakerArbeidsgiverDTO;
  sted: string;
  tid: string;
}
