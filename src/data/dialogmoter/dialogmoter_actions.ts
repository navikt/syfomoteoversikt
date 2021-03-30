import { DialogmoterDTO } from "./dialogmoter";

export const HENT_DIALOGMOTER_FEILET = "HENT_DIALOGMOTER_FEILET";
export const HENT_DIALOGMOTER_HENTER = "HENT_DIALOGMOTER_HENTER";
export const HENT_DIALOGMOTER_FORESPURT = "HENT_DIALOGMOTER_FORESPURT";
export const HENT_DIALOGMOTER_HENTET = "HENT_DIALOGMOTER_HENTET";

export interface HentDialogmoterFeiletAction {
  type: typeof HENT_DIALOGMOTER_FEILET;
}

export interface HentDialogmoterHenterAction {
  type: typeof HENT_DIALOGMOTER_HENTER;
}

export interface HentDialogmoterHentetAction {
  type: typeof HENT_DIALOGMOTER_HENTET;
  data: DialogmoterDTO[];
  enhet: string;
}

export interface HentDialogmoterAction {
  type: typeof HENT_DIALOGMOTER_FORESPURT;
  enhetNr: string;
}

export type DialogmoterActions =
  | HentDialogmoterAction
  | HentDialogmoterHenterAction
  | HentDialogmoterFeiletAction
  | HentDialogmoterHentetAction;

export const hentDialogmoterFeilet = (): HentDialogmoterFeiletAction => ({
  type: HENT_DIALOGMOTER_FEILET,
});

export const hentDialogmoterHenter = (): HentDialogmoterHenterAction => ({
  type: HENT_DIALOGMOTER_HENTER,
});

export const hentDialogmoter = (enhetNr: string): HentDialogmoterAction => ({
  type: HENT_DIALOGMOTER_FORESPURT,
  enhetNr,
});

export const hentDialogmoterHentet = (
  data: DialogmoterDTO[],
  enhet: string
): HentDialogmoterHentetAction => ({
  type: HENT_DIALOGMOTER_HENTET,
  data,
  enhet,
});
