import { combineReducers } from "redux";
import enhet, { EnhetState } from "./enhet/enhet";
import moter, { MoterState } from "./moter/moter";
import overfor, { OverforMoterState } from "./moter/overfor";
import veiledere, { VeiledereState } from "./veiledere/veiledere";
import moterEnhet, { MoterEnhetState } from "./moter/moterEnhet";
import dialogmoter, { DialogmoterState } from "./dialogmoter/dialogmoter";

export interface RootState {
  enhet: EnhetState;
  moter: MoterState;
  overfor: OverforMoterState;
  veiledere: VeiledereState;
  moterEnhet: MoterEnhetState;
  dialogmoter: DialogmoterState;
}

export const rootReducer = combineReducers<RootState>({
  enhet,
  moter,
  overfor,
  veiledere,
  moterEnhet,
  dialogmoter,
});
