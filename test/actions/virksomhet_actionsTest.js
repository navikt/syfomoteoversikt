import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../src/js/actions/virksomhet_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("virksomhet_actions", () => {

    it("har en hentVirksomhet-funksjon som returnerer riktig action", () => {
        const action = actions.hentVirksomhet('orgnummer', 'moteUuid');
        expect(action).to.deep.equal({
            type: 'HENT_VIRKSOMHET_FORESPURT',
            orgnummer: 'orgnummer',
            moteUuid: 'moteUuid',
        })
    });

    it("har en henterVirksomhet-funksjon som returnerer riktig action", () => {
        const action = actions.henterVirksomhet();
        expect(action).to.deep.equal({
            type: 'HENTER_VIRKSOMHET'
        })
    });

    it("har en virksomhetHentet-funksjon som returnerer riktig action", () => {
        const action = actions.virksomhetHentet({navn: "Berit"}, 'moteUuid');
        expect(action).to.deep.equal({
            type: 'VIRKSOMHET_HENTET',
            data: {
                navn: "Berit"
            },
            moteUuid: 'moteUuid',
        })
    });

    it("har en hentVirksomhetFeilet-funksjon som returnerer riktig action", () => {
        const action = actions.hentVirksomhetFeilet();
        expect(action).to.deep.equal({
            type: 'HENT_VIRKSOMHET_FEILET',
        })
    });

})
