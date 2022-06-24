export interface MoteoverforingState {
  dialogmoterMarkert: string[];
  antallDialogmoterOverfort: number | undefined;
}

export const moteoverforingInitialState: MoteoverforingState = {
  antallDialogmoterOverfort: undefined,
  dialogmoterMarkert: [],
};
