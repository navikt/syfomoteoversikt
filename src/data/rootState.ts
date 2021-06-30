import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import enhet from "./enhet/enhet";
import moter from "./moter/moter";
import overfor from "./moter/overfor";
import veiledere from "./veiledere/veiledere";
import moterEnhet from "./moter/moterEnhet";
import dialogmoter from "./dialogmoter/dialogmoter";
import { History, LocationState } from "history";

export const createRootReducer = (history: History<LocationState>) => {
  return combineReducers({
    router: connectRouter(history),
    enhet,
    moter,
    overfor,
    veiledere,
    moterEnhet,
    dialogmoter,
  });
};
