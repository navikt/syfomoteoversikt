import {expect} from 'chai';
import {hentEnhetsMoter} from '../../js/sagas/moterEnhetSagas';
import {get} from '../../js/api';
import {put, call} from 'redux-saga/effects';

describe("enhetMoterSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer"
        }
    });

    const generator = hentEnhetsMoter({
        enhet: "0001",
    });

    it("Skal dispatche HENTER_ENHETSMOTER", () => {
        const nextPut = put({type: 'HENTER_ENHETSMOTER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente enhets moter", () => {
        const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/moter?navenhet=0001`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche ENHETSMOTER_HENTET", () => {
        const nextPut = put({
            type: 'ENHETSMOTER_HENTET',
            data: [],
        });
        expect(generator.next([]).value).to.deep.equal(nextPut);
    });

});