import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import moter from '../../js/reducers/moter';
import * as actions from '../../js/actions/virksomhet_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("moter", () => {

    it("Håndterer henterVirksomheter", () => {
        const action = actions.henterVirksomhet();
        const state = moter({data: []}, action);
        expect(state).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        })
    });

    it("Setter virksomhetens navn på arbeidsgiver", () => {
        const action = actions.virksomhetHentet({
            navn: "BEKK CONSULTING AS",
        }, 'moteUuid1');
        const state = moter({
            data: [{
                moteUuid: 'moteUuid1',
                deltakere: [{
                    type: 'arbeidsgiver',
                }, {
                    type: 'Bruker'
                }]
            }]
        }, action);
        expect(state).to.deep.equal({
            data: [{
                moteUuid: 'moteUuid1',
                deltakere: [{
                    type: 'arbeidsgiver',
                    virksomhet: 'BEKK CONSULTING AS'
                }, {
                    type: 'Bruker'
                }]
            }],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        })
    });

    it("Setter ikke virksomhetens navn på arbeidsgiver dersom uuid ikke matcher", () => {
        const action = actions.virksomhetHentet({
            navn: "BEKK CONSULTING AS",
        }, 'moteUuid2');
        const state = moter({
            data: [{
                moteUuid: 'moteUuid1',
                deltakere: [{
                    type: 'arbeidsgiver',
                }, {
                    type: 'Bruker'
                }]
            }]
        }, action);
        expect(state).to.deep.equal({
            data: [{
                moteUuid: 'moteUuid1',
                deltakere: [{
                    type: 'arbeidsgiver',
                }, {
                    type: 'Bruker'
                }]
            }],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        })
    });

    it("Håndterer hentVeilederFeilet", () => {
        const action = actions.hentVirksomhetFeilet();
        const state = moter({data: []}, action);
        expect(state).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        })
    })
})
;