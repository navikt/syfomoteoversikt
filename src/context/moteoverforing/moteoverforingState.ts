export interface MoteoverforingState {
  moterMarkert: string[];
  dialogmoterMarkert: string[];
  antallMoterOverfort: number | undefined;
  antallDialogmoterOverfort: number | undefined;
}

export const moteoverforingInitialState: MoteoverforingState = {
  antallDialogmoterOverfort: undefined,
  antallMoterOverfort: undefined,
  moterMarkert: [],
  dialogmoterMarkert: [],
};
