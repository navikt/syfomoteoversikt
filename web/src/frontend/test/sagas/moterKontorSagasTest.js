import {expect} from 'chai';
import {hentKontoretsMoter} from '../../js/sagas/moterKontorSagas';
import {get} from '../../js/api';
import {put, call} from 'redux-saga/effects';

describe("kontorMoterSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer"
        }
    });

    const generator = hentKontoretsMoter({
        enhet: "0001",
    });

    it("Skal dispatche HENTER_KONTORETSMOTER", () => {
        const nextPut = put({type: 'HENTER_KONTORETSMOTER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente kontorets moter", () => {
        const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/moter?navenhet=0001`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche KONTORETSMOTER_HENTET", () => {
        const nextPut = put({
            type: 'KONTORETSMOTER_HENTET',
            data: [],
        });
        expect(generator.next([]).value).to.deep.equal(nextPut);
    });

});