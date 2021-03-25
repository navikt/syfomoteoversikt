import { MoteDTO } from "./moterTypes";

export const HENT_MOTER_FEILET = "HENT_MOTER_FEILET";
export const HENT_MOTER_HENTER = "HENTER_MOTER";
export const HENT_MOTER_FORESPURT = "HENT_MOTER_FORESPURT";
export const HENT_MOTER_HENTET = "MOTER_HENTET";

export interface HentMoterAction {
  type: typeof HENT_MOTER_FORESPURT;
}

export interface HenterMoterAction {
  type: typeof HENT_MOTER_HENTER;
}

export interface MoterHentetAction {
  type: typeof HENT_MOTER_HENTET;
  data: MoteDTO[];
}

export interface HentMoterFeiletAction {
  type: typeof HENT_MOTER_FEILET;
}

export type MoterActions =
  | HenterMoterAction
  | HentMoterAction
  | MoterHentetAction
  | HentMoterFeiletAction;

export const hentMoter = (): HentMoterAction => ({
  type: HENT_MOTER_FORESPURT,
});

export const henterMoter = (): HenterMoterAction => ({
  type: HENT_MOTER_HENTER,
});

export const moterHentet = (data: MoteDTO[]): MoterHentetAction => ({
  type: HENT_MOTER_HENTET,
  data,
});

export const hentMoterFeilet = (): HentMoterFeiletAction => ({
  type: HENT_MOTER_FEILET,
});
