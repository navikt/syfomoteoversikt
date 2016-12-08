import {expect} from 'chai';
import {hentVirksomhet} from '../../js/sagas/virksomhetSagas';
import {get} from '../../js/api';
import {put, call} from 'redux-saga/effects';

describe("virksomhetSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer"
        }
    });

    const generator = hentVirksomhet({
        orgnummer: "55",
        moteUuid: "moteUuid"
    });

    it("Skal dispatche HENTER_VIRKSOMHET", () => {
        const nextPut = put({type: 'HENTER_VIRKSOMHET'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente virksomhet", () => {
        const nextCall = call(get, "http://tjenester.nav.no/sykefravaer/virksomhet/55");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche VIRKSOMHET_HENTET", () => {
        const nextPut = put({
            type: 'VIRKSOMHET_HENTET', moteUuid: "moteUuid",
            data: {
                navn: "Berit"
            }
        })
        expect(generator.next({
            navn: "Berit"
        }).value).to.deep.equal(nextPut);
    });

})