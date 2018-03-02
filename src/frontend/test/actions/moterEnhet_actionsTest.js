import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/moterEnhet_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("moterEnhet_actions", () => {

    it("har en hentEnhetsMoter-funksjon som returnerer riktig action", () => {
        const action = actions.hentEnhetsMoter("0001");
        expect(action).to.deep.equal({
            type: 'HENT_ENHETSMOTER',
            enhet: "0001",
        })
    });

    it("har en henterEnhetsMoter-funksjon som returnerer riktig action", () => {
        const action = actions.henterEnhetsMoter('0021');
        expect(action).to.deep.equal({
            type: 'HENTER_ENHETSMOTER',
            enhet: '0021',
        })
    });

    it("har en enhetsMoterHentet-funksjon som retur" +
        "nerer riktig action", () => {
        const action = actions.enhetsMoterHentet([]);
        expect(action).to.deep.equal({
            type: 'ENHETSMOTER_HENTET',
            data: [],
        })
    });

    it("har en hentEnhetsMoterFeilet-funksjon som returnerer riktig action", () => {
        const action = actions.hentEnhetsMoterFeilet();
        expect(action).to.deep.equal({
            type: 'HENT_ENHETSMOTER_FEILET',
        })
    });
});