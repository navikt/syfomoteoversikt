import { VirksomhetDTO } from "./VirksomhetDTO";

export const HENT_VIRKSOMHET_FORESPURT = "HENT_VIRKSOMHET_FORESPURT";
export const HENTER_VIRKSOMHET = "HENTER_VIRKSOMHET";
export const VIRKSOMHET_HENTET = "VIRKSOMHET_HENTET";
export const HENT_VIRKSOMHET_FEILET = "HENT_VIRKSOMHET_FEILET";

export const hentVirksomhet = (orgnummer: string, moteUuid: string) => {
  return {
    type: HENT_VIRKSOMHET_FORESPURT,
    orgnummer,
    moteUuid,
  };
};

export const henterVirksomhet = () => {
  return {
    type: HENTER_VIRKSOMHET,
  };
};

export const virksomhetHentet = (data: VirksomhetDTO, moteUuid: string) => {
  return {
    type: VIRKSOMHET_HENTET,
    data,
    moteUuid,
  };
};

export const hentVirksomhetFeilet = () => {
  return {
    type: HENT_VIRKSOMHET_FEILET,
  };
};
