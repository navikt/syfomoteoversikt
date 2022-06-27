export enum MoteoverforingActionType {
  MarkerDialogmote,
  DialogmoterOverfort,
  ResetAntallOverfort,
}

export interface MarkerDialogmote {
  type: MoteoverforingActionType.MarkerDialogmote;
  dialogmoteUuid: string;
  overta: boolean;
}

export interface DialogmoterOverfort {
  type: MoteoverforingActionType.DialogmoterOverfort;
}

export interface ResetAntallOverfort {
  type: MoteoverforingActionType.ResetAntallOverfort;
}

export type MoteoverforingAction =
  | MarkerDialogmote
  | DialogmoterOverfort
  | ResetAntallOverfort;
