import { BrukerinfoDTO } from "./BrukerinfoDTO";

export const HENT_BRUKER_FORESPURT = "HENT_BRUKER_FORESPURT";
export const HENTER_BRUKER = "HENTER_BRUKER";
export const BRUKER_HENTET = "BRUKER_HENTET";
export const HENT_BRUKER_FEILET = "HENT_BRUKER_FEILET";

export const hentBruker = (ident: string, moteUuid: string) => {
  return {
    type: HENT_BRUKER_FORESPURT,
    ident,
    moteUuid,
  };
};

export const henterBruker = () => {
  return {
    type: HENTER_BRUKER,
  };
};

export const brukerHentet = (data: BrukerinfoDTO, moteUuid: string) => {
  return {
    type: BRUKER_HENTET,
    data,
    moteUuid,
  };
};

export const hentBrukerFeilet = () => {
  return {
    type: HENT_BRUKER_FEILET,
  };
};
