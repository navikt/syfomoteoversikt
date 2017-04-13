import moterSagas from '../sagas/moterSagas';
import veilederSagas from '../sagas/veilederSagas';
import virksomhetSagas from '../sagas/virksomhetSagas';
import brukerSagas from '../sagas/brukerSagas';
import modiacontextSagas from '../sagas/modiacontextSagas';
import { ledeteksterSagas } from 'digisyfo-npm';
import moterEnhetSagas from './moterEnhetSagas';

export default function * rootSaga() {
    yield [
        moterSagas(),
        ledeteksterSagas(),
        veilederSagas(),
        brukerSagas(),
        modiacontextSagas(),
        virksomhetSagas(),
        moterEnhetSagas(),
    ];
}
