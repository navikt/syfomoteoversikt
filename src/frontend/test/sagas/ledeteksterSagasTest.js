import { expect } from 'chai';
import { hentLedetekster } from '../../js/sagas/ledeteksterSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';
// import * as ledetekster from '../../js//redledetekster';
import sinon from 'sinon';

describe("ledeteksterSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            SYFOREST_ROOT: "https://modapp.adeo.no/modiasyforest/rest"
        }
    });

    const generator = hentLedetekster();

    it("Skal dispatche HENTER_LEDETEKSTER", () => {
        const nextPut = put({type: 'HENTER_LEDETEKSTER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente ledetekster", () => {
        const nextCall = call(get, "https://modapp.adeo.no/modiasyforest/rest/informasjon/tekster");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest sette ledetekster", () => {
        const nextPut = put({
            type: 'LEDETEKSTER_HENTET',
            ledetekster: {"min.ledetekst": "Hello world!"}
        });
        expect(generator.next({"min.ledetekst": "Hello world!"}).value).to.deep.equal(nextPut);
    });

});