import moterSagas from '../sagas/moterSagas';
import veilederSagas from '../sagas/veilederSagas';
import virksomhetSagas from '../sagas/virksomhetSagas';
import { ledeteksterSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        moterSagas(),
        ledeteksterSagas(),
        veilederSagas(),
        virksomhetSagas(),
    ];
}
