export const HENT_FNR_FORESPURT = "HENT_FNR_FORESPURT";
export const HENTER_FNR = "HENTER_FNR";
export const FNR_HENTET = "FNR_HENTET";
export const HENT_FNR_FEILET = "HENT_FNR_FEILET";

export const hentFnr = (ident: string, moteUuid: string) => {
  return {
    type: HENT_FNR_FORESPURT,
    ident,
    moteUuid,
  };
};

export const henterFnr = () => {
  return {
    type: HENTER_FNR,
  };
};

export const fnrHentet = (data: string, moteUuid: string) => {
  return {
    type: FNR_HENTET,
    data,
    moteUuid,
  };
};

export const hentFnrFeilet = () => {
  return {
    type: HENT_FNR_FEILET,
  };
};
