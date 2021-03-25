import { MoteDTO } from "./moterTypes";

export const HENT_ENHETSMOTER = "HENT_ENHETSMOTER";
export const SET_AKTIV_ENHET = "SET_AKTIV_ENHET";
export const HENTER_ENHETSMOTER = "HENTER_ENHETSMOTER";
export const HENT_ENHETSMOTER_FEILET = "HENT_ENHETSMOTER_FEILET";
export const ENHETSMOTER_HENTET = "ENHETSMOTER_HENTET";

export interface HentEnhetsMoterAction {
  type: typeof HENT_ENHETSMOTER;
  enhet: string;
}

export interface SetAktivEnhetAction {
  type: typeof SET_AKTIV_ENHET;
  enhet: string;
}

export interface HenterEnhetsMoterAction {
  type: typeof HENTER_ENHETSMOTER;
  enhet: string;
}

export interface EnhetsMoterHentetAction {
  type: typeof ENHETSMOTER_HENTET;
  data: MoteDTO[];
}

export interface HentEnhetsMoterFeiletAction {
  type: typeof HENT_ENHETSMOTER_FEILET;
}

export type MoterEnhetActions =
  | HentEnhetsMoterAction
  | SetAktivEnhetAction
  | HenterEnhetsMoterAction
  | EnhetsMoterHentetAction
  | HentEnhetsMoterFeiletAction;

export const hentEnhetsMoter = (enhet: string): HentEnhetsMoterAction => ({
  type: HENT_ENHETSMOTER,
  enhet,
});

export const setAktivEnhet = (enhet: string): SetAktivEnhetAction => ({
  type: SET_AKTIV_ENHET,
  enhet,
});

export const henterEnhetsMoter = (enhet: string): HenterEnhetsMoterAction => ({
  type: HENTER_ENHETSMOTER,
  enhet,
});

export const enhetsMoterHentet = (
  data: MoteDTO[]
): EnhetsMoterHentetAction => ({
  type: ENHETSMOTER_HENTET,
  data,
});

export const hentEnhetsMoterFeilet = (): HentEnhetsMoterFeiletAction => ({
  type: HENT_ENHETSMOTER_FEILET,
});
