import moterSagas from '../sagas/moterSagas';
import veilederSagas from '../sagas/veilederSagas';
import { ledeteksterSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        moterSagas(),
        ledeteksterSagas(),
        veilederSagas(),
    ];
}
