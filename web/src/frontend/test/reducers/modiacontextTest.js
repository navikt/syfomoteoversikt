import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import modiacontext from '../../js/reducers/modiacontext';
import * as actions from '../../js/actions/modiacontext_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("modiacontext", () => {

    it("Håndterer henterAktivEnhet", () => {
        const action = actions.henterAktivEnhet();
        const state = modiacontext({data: {}}, action);
        expect(state).to.deep.equal({
            henterEnhet: true,
            hentingEnhetFeilet: false,
            data: {},
        })
    });

    it("Setter virksomhetens navn på arbeidsgiver", () => {
        const action = actions.hentAktivEnhetFeilet();
        const state = modiacontext({data: {}}, action);
        expect(state).to.deep.equal({
            henterEnhet: false,
            hentingEnhetFeilet: true,
            data: {},
        })
    });
});
