import { all } from "redux-saga/effects";
import moterSagas from "../data/moter/moterSagas";
import veilederSagas from "../data/veiledere/veilederSagas";
import virksomhetSagas from "../data/virksomhet/virksomhetSagas";
import fnrSagas from "../data/fnr/fnrSagas";
import brukerSagas from "../data/bruker/brukerSagas";
import modiacontextSagas from "../data/modiacontext/modiacontextSagas";
import moterEnhetSagas from "../data/moter/moterEnhetSagas";
import veilederinfoSagas from "../data/veilederinfo/veilederinfoSagas";

export default function* rootSaga() {
  yield all([
    fnrSagas(),
    moterSagas(),
    veilederSagas(),
    brukerSagas(),
    modiacontextSagas(),
    virksomhetSagas(),
    moterEnhetSagas(),
    veilederinfoSagas(),
  ]);
}
