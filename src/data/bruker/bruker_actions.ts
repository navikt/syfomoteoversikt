import { BrukerinfoDTO } from "./BrukerinfoDTO";

export const HENT_BRUKER_FORESPURT = "HENT_BRUKER_FORESPURT";
export const HENTER_BRUKER = "HENTER_BRUKER";
export const BRUKER_HENTET = "BRUKER_HENTET";
export const HENT_BRUKER_FEILET = "HENT_BRUKER_FEILET";

export interface HentBrukerAction {
  ident: string;
  moteUuid: string;
  type: typeof HENT_BRUKER_FORESPURT;
}

export interface HenterBrukerAction {
  type: typeof HENTER_BRUKER;
}

export interface BrukerHentetAction {
  data: BrukerinfoDTO;
  moteUuid: string;
  type: typeof BRUKER_HENTET;
}

export interface HentBrukerFeiletAction {
  type: typeof HENT_BRUKER_FEILET;
}

export type BrukerActions =
  | HentBrukerAction
  | HenterBrukerAction
  | BrukerHentetAction
  | HentBrukerFeiletAction;

export const hentBruker = (
  ident: string,
  moteUuid: string
): HentBrukerAction => ({
  type: HENT_BRUKER_FORESPURT,
  ident,
  moteUuid,
});

export const henterBruker = (): HenterBrukerAction => ({
  type: HENTER_BRUKER,
});

export const brukerHentet = (
  data: BrukerinfoDTO,
  moteUuid: string
): BrukerHentetAction => ({
  type: BRUKER_HENTET,
  data,
  moteUuid,
});

export const hentBrukerFeilet = (): HentBrukerFeiletAction => ({
  type: HENT_BRUKER_FEILET,
});
