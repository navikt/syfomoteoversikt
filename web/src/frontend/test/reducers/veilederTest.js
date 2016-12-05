import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import veileder from '../../js/reducers/veileder';
import * as actions from '../../js/actions/veileder_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("veileder", () => {

    it("Har en default state", () => {
        const state = veileder();
        expect(state).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: false
        })
    });

    it("Håndterer henterVeileder", () => {
        const action = actions.henterVeileder();
        const state = veileder({}, action);
        expect(state).to.deep.equal({
            data: {},
            henter: true,
            hentingFeilet: false
        })
    });

    it("Håndterer veilederHentet", () => {
        const action = actions.veilederHentet({
            navn: "Berit"
        });
        const state = veileder({}, action);
        expect(state).to.deep.equal({
            data: {
                navn: "Berit"
            },
            henter: false,
            hentingFeilet: false
        })
    })

    it("Håndterer hentVeilederFeilet", () => {
        const action = actions.hentVeilederFeilet();
        const state = veileder({}, action);
        expect(state).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: true,
        })
    })
});