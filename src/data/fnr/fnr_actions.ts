export const HENT_FNR_FORESPURT = "HENT_FNR_FORESPURT";
export const HENTER_FNR = "HENTER_FNR";
export const FNR_HENTET = "FNR_HENTET";
export const HENT_FNR_FEILET = "HENT_FNR_FEILET";

export interface HentFnrAction {
  type: typeof HENT_FNR_FORESPURT;
  ident: string;
  moteUuid: string;
}

export interface HenterFnrAction {
  type: typeof HENTER_FNR;
}

export interface FnrHentetAction {
  type: typeof FNR_HENTET;
  data: string;
  moteUuid: string;
}

export interface HentFnrFeiletAction {
  type: typeof HENT_FNR_FEILET;
}

export type FnrActions =
  | HentFnrAction
  | HenterFnrAction
  | FnrHentetAction
  | HentFnrFeiletAction;

export const hentFnr = (ident: string, moteUuid: string): HentFnrAction => ({
  type: HENT_FNR_FORESPURT,
  ident,
  moteUuid,
});

export const henterFnr = (): HenterFnrAction => ({
  type: HENTER_FNR,
});

export const fnrHentet = (data: string, moteUuid: string): FnrHentetAction => ({
  type: FNR_HENTET,
  data,
  moteUuid,
});

export const hentFnrFeilet = (): HentFnrFeiletAction => ({
  type: HENT_FNR_FEILET,
});
