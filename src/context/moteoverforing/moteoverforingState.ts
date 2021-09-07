export interface MoteoverforingState {
  moterMarkert: string[];
  dialogmoterMarkert: string[];
  antallMoterOverfort?: number;
  antallDialogmoterOverfort?: number;
}

export const moteoverforingInitialState: MoteoverforingState = {
  moterMarkert: [],
  dialogmoterMarkert: [],
};
