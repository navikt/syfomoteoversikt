import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/moterKontor_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("moterKontor_actions", () => {

    it("har en hentKontoretsMoter-funksjon som returnerer riktig action", () => {
        const action = actions.hentKontoretsMoter("0001");
        expect(action).to.deep.equal({
            type: 'HENT_KONTORETSMOTER',
            enhet: "0001",
        })
    });

    it("har en henterKontoretsMoter-funksjon som returnerer riktig action", () => {
        const action = actions.henterKontoretsMoter();
        expect(action).to.deep.equal({
            type: 'HENTER_KONTORETSMOTER',
        })
    });

    it("har en kontoretsMoterHentet-funksjon som retur" +
        "nerer riktig action", () => {
        const action = actions.kontoretsMoterHentet([]);
        expect(action).to.deep.equal({
            type: 'KONTORETSMOTER_HENTET',
            data: [],
        })
    });

    it("har en hentKontoretsMoterFeilet-funksjon som returnerer riktig action", () => {
        const action = actions.hentKontoretsMoterFeilet();
        expect(action).to.deep.equal({
            type: 'HENT_KONTORETSMOTER_FEILET',
        })
    });
});