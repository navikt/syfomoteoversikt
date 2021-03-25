export const MARKER_MOTE_FOR_OVERFORING = "MARKER_MOTE_FOR_OVERFORING";
export const OVERFOR_MOTER_FORESPURT = "OVERFOR_MOTER_FORESPURT";
export const OVERFORER_MOTER = "OVERFORER_MOTER";
export const OVERFOR_MOTER_FEILET = "OVERFOR_MOTER_FEILET";
export const MOTER_OVERFORT = "MOTER_OVERFORT";
export const OVERFOR_MOTER_RESET = "OVERFOR_MOTER_RESET";

export interface MarkerMoteForOverforingAction {
  type: typeof MARKER_MOTE_FOR_OVERFORING;
  moteUuid: string;
  overta: boolean;
}

export interface OverforMoterAction {
  type: typeof OVERFOR_MOTER_FORESPURT;
  moteUuidListe: string[];
}

export interface OverforerMoterAction {
  type: typeof OVERFORER_MOTER;
}

export interface OverforMoterFeiletAction {
  type: typeof OVERFOR_MOTER_FEILET;
}

export interface MoterOverfortAction {
  type: typeof MOTER_OVERFORT;
}

export interface ResetOverforingAction {
  type: typeof OVERFOR_MOTER_RESET;
}

export type OverforActions =
  | MarkerMoteForOverforingAction
  | OverforMoterAction
  | OverforerMoterAction
  | OverforMoterFeiletAction
  | MoterOverfortAction
  | ResetOverforingAction;

export const markerMoteForOverforing = (
  moteUuid: string,
  overta: boolean
): MarkerMoteForOverforingAction => ({
  type: MARKER_MOTE_FOR_OVERFORING,
  moteUuid,
  overta,
});

export const overforMoter = (data: {
  moteUuidListe: string[];
}): OverforMoterAction => ({
  type: OVERFOR_MOTER_FORESPURT,
  moteUuidListe: data.moteUuidListe,
});

export const overforerMoter = (): OverforerMoterAction => ({
  type: OVERFORER_MOTER,
});

export const overforMoterFeilet = (): OverforMoterFeiletAction => ({
  type: OVERFOR_MOTER_FEILET,
});

export const moterOverfort = (): MoterOverfortAction => ({
  type: MOTER_OVERFORT,
});

export const resetOverforing = (): ResetOverforingAction => ({
  type: OVERFOR_MOTER_RESET,
});
