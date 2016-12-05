import { expect } from 'chai';
import { hentVeileder } from '../../js/sagas/veilederSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("veilederSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer"
        }
    });

    const generator = hentVeileder();

    it("Skal dispatche HENTER_VEILEDER", () => {
        const nextPut = put({type: 'HENTER_VEILEDER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente veileder", () => {
        const nextCall = call(get, "http://tjenester.nav.no/sykefravaer/veilederinfo");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche VEILEDER_HENTET", () => {
        const nextPut = put({type: 'VEILEDER_HENTET', data: {
            navn: "Berit"
        }})
        expect(generator.next({
            navn: "Berit"
        }).value).to.deep.equal(nextPut);
    });

})