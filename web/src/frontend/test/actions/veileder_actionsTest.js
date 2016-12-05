import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/veileder_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("veileder_actions", () => {

    it("har en hentVeileder-funksjon som returnerer riktig action", () => {
        const action = actions.hentVeileder();
        expect(action).to.deep.equal({
            type: 'HENT_VEILEDER_FORESPURT'
        })
    });

    it("har en henterVeileder-funksjon som returnerer riktig action", () => {
        const action = actions.henterVeileder();
        expect(action).to.deep.equal({
            type: 'HENTER_VEILEDER'
        })
    });
    
    it("har en veilederHentet-funksjon som returnerer riktig action", () => {
        const action = actions.veilederHentet({navn: "Berit"});
        expect(action).to.deep.equal({
            type: 'VEILEDER_HENTET',
            data: {
                navn: "Berit"
            }
        })
    });

    it("har en hentVeilederFeilet-funksjon som returnerer riktig action", () => {
        const action = actions.hentVeilederFeilet();
        expect(action).to.deep.equal({
            type: 'HENT_VEILEDER_FEILET',
        })
    });
    
})