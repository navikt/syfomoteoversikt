export const MARKER_MOTE_FOR_OVERFORING = "MARKER_MOTE_FOR_OVERFORING";
export const MARKER_DIALOGMOTE_FOR_OVERFORING =
  "MARKER_DIALOGMOTE_FOR_OVERFORING";
export const OVERFOR_MOTER_FORESPURT = "OVERFOR_MOTER_FORESPURT";
export const OVERFOR_DIALOGMOTER_FORESPURT = "OVERFOR_DIALOGMOTER_FORESPURT";
export const OVERFORER_MOTER = "OVERFORER_MOTER";
export const OVERFORER_DIALOGMOTER = "OVERFORER_DIALOGMOTER";
export const OVERFOR_MOTER_FEILET = "OVERFOR_MOTER_FEILET";
export const OVERFOR_DIALOGMOTER_FEILET = "OVERFOR_DIALOGMOTER_FEILET";
export const MOTER_OVERFORT = "MOTER_OVERFORT";
export const DIALOGMOTER_OVERFORT = "DIALOGMOTER_OVERFORT";
export const OVERFOR_MOTER_RESET = "OVERFOR_MOTER_RESET";
export const OVERFOR_DIALOGMOTER_RESET = "OVERFOR_DIALOGMOTER_RESET";
export const ANTALL_MOTER_OVERFORT_RESET = "ANTALL_MOTER_OVERFORT_RESET";
export const ANTALL_DIALOGMOTER_OVERFORT_RESET =
  "ANTALL_DIALOGMOTER_OVERFORT_RESET";

export interface MarkerMoteForOverforingAction {
  type: typeof MARKER_MOTE_FOR_OVERFORING;
  moteUuid: string;
  overta: boolean;
}

export interface MarkerDialogmoteForOverforingAction {
  type: typeof MARKER_DIALOGMOTE_FOR_OVERFORING;
  dialogmoteUuid: string;
  overta: boolean;
}

export interface OverforMoterAction {
  type: typeof OVERFOR_MOTER_FORESPURT;
  moteUuids: string[];
}

export interface OverforDialogmoterAction {
  type: typeof OVERFOR_DIALOGMOTER_FORESPURT;
  dialogmoteUuids: string[];
}

export interface OverforerMoterAction {
  type: typeof OVERFORER_MOTER;
}

export interface OverforerDialogmoterAction {
  type: typeof OVERFORER_DIALOGMOTER;
}

export interface OverforMoterFeiletAction {
  type: typeof OVERFOR_MOTER_FEILET;
}

export interface OverforDialogmoterFeiletAction {
  type: typeof OVERFOR_DIALOGMOTER_FEILET;
}

export interface MoterOverfortAction {
  type: typeof MOTER_OVERFORT;
}

export interface DialogmoterOverfortAction {
  type: typeof DIALOGMOTER_OVERFORT;
}

export interface ResetMoteOverforingAction {
  type: typeof OVERFOR_MOTER_RESET;
}

export interface ResetDialogmoteOverforingAction {
  type: typeof OVERFOR_DIALOGMOTER_RESET;
}

export interface ResetAntallMoterOverfortAction {
  type: typeof ANTALL_MOTER_OVERFORT_RESET;
}

export interface ResetAntallDialogmoterOverfortAction {
  type: typeof ANTALL_DIALOGMOTER_OVERFORT_RESET;
}

export type OverforActions =
  | MarkerMoteForOverforingAction
  | MarkerDialogmoteForOverforingAction
  | OverforMoterAction
  | OverforDialogmoterAction
  | OverforerMoterAction
  | OverforerDialogmoterAction
  | OverforMoterFeiletAction
  | OverforDialogmoterFeiletAction
  | MoterOverfortAction
  | DialogmoterOverfortAction
  | ResetMoteOverforingAction
  | ResetDialogmoteOverforingAction
  | ResetAntallMoterOverfortAction
  | ResetAntallDialogmoterOverfortAction;

export const markerMoteForOverforing = (
  moteUuid: string,
  overta: boolean
): MarkerMoteForOverforingAction => ({
  type: MARKER_MOTE_FOR_OVERFORING,
  moteUuid,
  overta,
});

export const markerDialogmoteForOverforing = (
  dialogmoteUuid: string,
  overta: boolean
): MarkerDialogmoteForOverforingAction => ({
  type: MARKER_DIALOGMOTE_FOR_OVERFORING,
  dialogmoteUuid,
  overta,
});

export const overforMoter = (data: {
  moteUuids: string[];
}): OverforMoterAction => ({
  type: OVERFOR_MOTER_FORESPURT,
  moteUuids: data.moteUuids,
});

export const overforDialogmoter = (data: {
  dialogmoteUuids: string[];
}): OverforDialogmoterAction => ({
  type: OVERFOR_DIALOGMOTER_FORESPURT,
  dialogmoteUuids: data.dialogmoteUuids,
});

export const overforerMoter = (): OverforerMoterAction => ({
  type: OVERFORER_MOTER,
});

export const overforerDialogmoter = (): OverforerDialogmoterAction => ({
  type: OVERFORER_DIALOGMOTER,
});

export const overforMoterFeilet = (): OverforMoterFeiletAction => ({
  type: OVERFOR_MOTER_FEILET,
});

export const overforDialogmoterFeilet = (): OverforDialogmoterFeiletAction => ({
  type: OVERFOR_DIALOGMOTER_FEILET,
});

export const moterOverfort = (): MoterOverfortAction => ({
  type: MOTER_OVERFORT,
});

export const dialogmoterOverfort = (): DialogmoterOverfortAction => ({
  type: DIALOGMOTER_OVERFORT,
});

export const resetMoteOverforing = (): ResetMoteOverforingAction => ({
  type: OVERFOR_MOTER_RESET,
});

export const resetDialogmoteOverforing = (): ResetDialogmoteOverforingAction => ({
  type: OVERFOR_DIALOGMOTER_RESET,
});

export const resetAntallMoterOverfort = (): ResetAntallMoterOverfortAction => ({
  type: ANTALL_MOTER_OVERFORT_RESET,
});

export const resetAntallDialogmoterOverfort = (): ResetAntallDialogmoterOverfortAction => ({
  type: ANTALL_DIALOGMOTER_OVERFORT_RESET,
});
