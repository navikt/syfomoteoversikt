import moterSagas from '../sagas/moterSagas';
import veilederSagas from '../sagas/veilederSagas';
import virksomhetSagas from '../sagas/virksomhetSagas';
import fnrSagas from './fnrSagas';
import brukerSagas from '../sagas/brukerSagas';
import modiacontextSagas from '../sagas/modiacontextSagas';
import moterEnhetSagas from './moterEnhetSagas';

export default function* rootSaga() {
    yield [
        fnrSagas(),
        moterSagas(),
        veilederSagas(),
        brukerSagas(),
        modiacontextSagas(),
        virksomhetSagas(),
        moterEnhetSagas(),
    ];
}
