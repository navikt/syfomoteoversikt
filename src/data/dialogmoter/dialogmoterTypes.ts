export enum DialogmoteStatus {
  INNKALT = "INNKALT",
  AVLYST = "AVLYST",
  FERDIGSTILT = "FERDIGSTILT",
  NYTT_TID_STED = "NYTT_TID_STED",
  LUKKET = "LUKKET",
}

export enum DialogmoteDeltakerVarselType {
  INNKALT = "INNKALT",
  NYTT_TID_STED = "NYTT_TID_STED",
  REFERAT = "REFERAT",
  AVLYST = "AVLYST",
}

export enum SvarType {
  KOMMER = "KOMMER",
  NYTT_TID_STED = "NYTT_TID_STED",
  KOMMER_IKKE = "KOMMER_IKKE",
}

export interface DialogmotedeltakerVarselDTO {
  uuid: string;
  createdAt: string;
  varselType: DialogmoteDeltakerVarselType;
  lestDato?: string;
  svar?: VarselSvarDTO;
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

interface VarselSvarDTO {
  svarType: SvarType;
}

export interface DialogmotedeltakerBehandlerVarselDTO {
  varselType: DialogmoteDeltakerVarselType;
  svar: VarselSvarDTO[];
}

export interface DialogmotedeltakerBehandlerDTO {
  varselList: DialogmotedeltakerBehandlerVarselDTO[];
}

export interface DialogmoterDTO {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  status: DialogmoteStatus;
  opprettetAv: string;
  tildeltVeilederIdent: string;
  tildeltEnhet: string;
  arbeidstaker: DialogmotedeltakerArbeidstakerDTO;
  arbeidsgiver: DialogmotedeltakerArbeidsgiverDTO;
  behandler?: DialogmotedeltakerBehandlerDTO;
  sted: string;
  tid: string;
}

export interface TildelDialogmoterRequestBody {
  veilederIdent: string;
  dialogmoteUuids: string[];
}
