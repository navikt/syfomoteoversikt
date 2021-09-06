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
    case MoteoverforingActionType.MarkerMote: {
      if (action.overta) {
        return {
          ...state,
          moterMarkert: [...state.moterMarkert, action.moteUuid],
        };
      } else {
        return {
          ...state,
          moterMarkert: state.moterMarkert.filter(
            (uuid) => uuid !== action.moteUuid
          ),
        };
      }
    }
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
    case MoteoverforingActionType.MoterOverfort: {
      return {
        ...state,
        moterMarkert: [],
        antallMoterOverfort: state.moterMarkert.length,
      };
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
        antallMoterOverfort: undefined,
        antallDialogmoterOverfort: undefined,
      };
    }
    default: {
      return { ...state };
    }
  }
};
