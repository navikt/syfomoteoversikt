export const SET_AKTIV_ENHET = "SET_AKTIV_ENHET";

export interface SetAktivEnhetAction {
  type: typeof SET_AKTIV_ENHET;
  enhet: string;
}

export type EnhetActions = SetAktivEnhetAction;

export const setAktivEnhet = (enhet: string): SetAktivEnhetAction => ({
  type: SET_AKTIV_ENHET,
  enhet,
});
