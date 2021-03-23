import { all } from "redux-saga/effects";
import moterSagas from "../data/moter/moterSagas";
import veilederSagas from "../data/veiledere/veilederSagas";
import virksomhetSagas from "../data/virksomhet/virksomhetSagas";
import fnrSagas from "../data/fnr/fnrSagas";
import brukerSagas from "../data/bruker/brukerSagas";
import moterEnhetSagas from "../data/moter/moterEnhetSagas";
import dialogmoterSagas from "../data/dialogmoter/dialogmoterSagas";

export default function* rootSaga() {
  yield all([
    fnrSagas(),
    moterSagas(),
    veilederSagas(),
    brukerSagas(),
    virksomhetSagas(),
    moterEnhetSagas(),
    dialogmoterSagas(),
  ]);
}
