import { DialogmoterDTO } from "./dialogmoter";

export const HENT_DIALOGMOTER_FEILET = "HENT_DIALOGMOTER_FEILET";
export const HENT_DIALOGMOTER_HENTER = "HENT_DIALOGMOTER_HENTER";
export const HENT_DIALOGMOTER_FORESPURT = "HENT_DIALOGMOTER_FORESPURT";
export const HENT_DIALOGMOTER_HENTET = "HENT_DIALOGMOTER_HENTET";

export interface HentDialogmoterReturnType {
  type: string;
  enhetNr: string;
}

export const hentDialogmoterFeilet = () => ({ type: HENT_DIALOGMOTER_FEILET });

export const hentDialogmoterHenter = () => ({ type: HENT_DIALOGMOTER_HENTER });

export const hentDialogmoter = (
  enhetNr: string
): HentDialogmoterReturnType => ({
  type: HENT_DIALOGMOTER_FORESPURT,
  enhetNr,
});

export const hentDialogmoterHentet = (data: DialogmoterDTO, enhet: string) => ({
  type: HENT_DIALOGMOTER_HENTET,
  data,
  enhet,
});
