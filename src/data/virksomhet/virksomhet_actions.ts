import { VirksomhetDTO } from "./VirksomhetDTO";

export const HENT_VIRKSOMHET_FORESPURT = "HENT_VIRKSOMHET_FORESPURT";
export const HENTER_VIRKSOMHET = "HENTER_VIRKSOMHET";
export const VIRKSOMHET_HENTET = "VIRKSOMHET_HENTET";
export const HENT_VIRKSOMHET_FEILET = "HENT_VIRKSOMHET_FEILET";

export interface HentVirksomhetAction {
  type: typeof HENT_VIRKSOMHET_FORESPURT;
  orgnummer: string;
  moteUuid: string;
}

export interface HenterVirksomhetAction {
  type: typeof HENTER_VIRKSOMHET;
}

export interface VirksomhetHentetAction {
  type: typeof VIRKSOMHET_HENTET;
  data: VirksomhetDTO;
  moteUuid: string;
}

export interface HentVirksomhetFeiletAction {
  type: typeof HENT_VIRKSOMHET_FEILET;
}

export type VirksomhetActions =
  | HentVirksomhetAction
  | HenterVirksomhetAction
  | VirksomhetHentetAction
  | HentVirksomhetFeiletAction;

export const hentVirksomhet = (
  orgnummer: string,
  moteUuid: string
): HentVirksomhetAction => ({
  type: HENT_VIRKSOMHET_FORESPURT,
  orgnummer,
  moteUuid,
});

export const henterVirksomhet = (): HenterVirksomhetAction => ({
  type: HENTER_VIRKSOMHET,
});

export const virksomhetHentet = (
  data: VirksomhetDTO,
  moteUuid: string
): VirksomhetHentetAction => ({
  type: VIRKSOMHET_HENTET,
  data,
  moteUuid,
});

export const hentVirksomhetFeilet = (): HentVirksomhetFeiletAction => ({
  type: HENT_VIRKSOMHET_FEILET,
});
