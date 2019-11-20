import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../src/js/actions/veileder_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("veileder_actions", () => {

    it("har en hentVeileder-funksjon som returnerer riktig action", () => {
        const action = actions.hentVeileder({ident: 'Z990572'});
        expect(action).to.deep.equal({
            type: 'HENT_VEILEDER_FORESPURT',
            data: {
                ident: 'Z990572'
            },
        })
    });

    it("har en henterVeileder-funksjon som returnerer riktig action", () => {
        const action = actions.henterVeileder({ident: 'Z990572', henter: true});
        expect(action).to.deep.equal({
            type: 'HENTER_VEILEDER',
            data: {
                ident: 'Z990572',
                henter: true,
            }
        })
    });

    it("har en veilederHentet-funksjon som returnerer riktig action", () => {
        const action = actions.veilederHentet({
            navn: "Berit",
            ident: 'Z990572',
            henter: false,
            hentingFeilet: false,
        });
        expect(action).to.deep.equal({
            type: 'VEILEDER_HENTET',
            data: {
                navn: "Berit",
                ident: 'Z990572',
                henter: false,
                hentingFeilet: false,
            }
        })
    });

    it("har en hentVeilederFeilet-funksjon som returnerer riktig action", () => {
        const action = actions.hentVeilederFeilet({
            ident: 'Z990572',
            henter: false,
            hentingFeilet: true,
        });
        expect(action).to.deep.equal({
            type: 'HENT_VEILEDER_FEILET',
            data: {
                henter: false,
                hentingFeilet: true,
                ident: 'Z990572',
            },
        })
    });

})
