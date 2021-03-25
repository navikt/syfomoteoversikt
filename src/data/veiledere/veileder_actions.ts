import { VeilederDto } from "./veilederTypes";

export const HENT_VEILEDER = "HENT_VEILEDER_FORESPURT";
export const HENTER_VEILEDER = "HENTER_VEILEDER";
export const VEILEDER_HENTET = "VEILEDER_HENTET";
export const HENT_VEILEDER_FEILET = "HENT_VEILEDER_FEILET";

export interface HentVeilederAction {
  type: typeof HENT_VEILEDER;
  data: VeilederDto;
}

export interface HenterVeilederAction {
  type: typeof HENTER_VEILEDER;
  data: VeilederDto;
}

export interface VeilederHentetAction {
  type: typeof VEILEDER_HENTET;
  data: VeilederDto;
}

export interface HentVeilederFeiletAction {
  type: typeof HENT_VEILEDER_FEILET;
  data: VeilederDto;
}

export type VeilederActions =
  | HentVeilederAction
  | HenterVeilederAction
  | VeilederHentetAction
  | HentVeilederFeiletAction;

export const hentVeileder = (data: VeilederDto): HentVeilederAction => ({
  type: HENT_VEILEDER,
  data,
});

export const henterVeileder = (data: VeilederDto): HenterVeilederAction => ({
  type: HENTER_VEILEDER,
  data,
});

export const veilederHentet = (data: VeilederDto): VeilederHentetAction => ({
  type: VEILEDER_HENTET,
  data,
});

export const hentVeilederFeilet = (
  data: VeilederDto
): HentVeilederFeiletAction => ({
  type: HENT_VEILEDER_FEILET,
  data,
});
