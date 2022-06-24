import { MoteoverforingState } from "@/context/moteoverforing/moteoverforingState";
import {
  MoteoverforingAction,
  MoteoverforingActionType,
} from "@/context/moteoverforing/moteoverforingActions";

export const moteoverforingReducer = (
  state: MoteoverforingState,
  action: MoteoverforingAction
): MoteoverforingState => {
  switch (action.type) {
    case MoteoverforingActionType.MarkerDialogmote: {
      if (action.overta) {
        return {
          ...state,
          dialogmoterMarkert: [
            ...state.dialogmoterMarkert,
            action.dialogmoteUuid,
          ],
        };
      } else {
        return {
          ...state,
          dialogmoterMarkert: state.dialogmoterMarkert.filter(
            (uuid) => uuid !== action.dialogmoteUuid
          ),
        };
      }
    }
    case MoteoverforingActionType.DialogmoterOverfort: {
      return {
        ...state,
        dialogmoterMarkert: [],
        antallDialogmoterOverfort: state.dialogmoterMarkert.length,
      };
    }

    case MoteoverforingActionType.ResetAntallOverfort: {
      return {
        ...state,
        antallDialogmoterOverfort: undefined,
      };
    }
    default: {
      return { ...state };
    }
  }
};
