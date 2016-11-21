import moterSagas from '../sagas/moterSagas';
import { ledeteksterSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        moterSagas(),
        ledeteksterSagas(),
    ];
}
