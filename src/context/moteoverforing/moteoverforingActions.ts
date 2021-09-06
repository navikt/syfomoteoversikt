export enum MoteoverforingActionType {
  MarkerMote,
  MarkerDialogmote,
  MoterOverfort,
  DialogmoterOverfort,
  ResetAntallOverfort,
}

export interface MarkerMote {
  type: MoteoverforingActionType.MarkerMote;
  moteUuid: string;
  overta: boolean;
}

export interface MarkerDialogmote {
  type: MoteoverforingActionType.MarkerDialogmote;
  dialogmoteUuid: string;
  overta: boolean;
}

export interface MoterOverfort {
  type: MoteoverforingActionType.MoterOverfort;
}

export interface DialogmoterOverfort {
  type: MoteoverforingActionType.DialogmoterOverfort;
}

export interface ResetAntallOverfort {
  type: MoteoverforingActionType.ResetAntallOverfort;
}

export type MoteoverforingAction =
  | MarkerMote
  | MarkerDialogmote
  | MoterOverfort
  | DialogmoterOverfort
  | ResetAntallOverfort;
