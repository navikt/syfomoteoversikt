import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import modiacontext from '../../src/js/reducers/modiacontext';
import * as actions from '../../src/js/actions/modiacontext_actions';

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

    it("Håndterer hentAktivEnhetFeilet", () => {
        const action = actions.hentAktivEnhetFeilet();
        const state = modiacontext({data: {}}, action);
        expect(state).to.deep.equal({
            henterEnhet: false,
            hentingEnhetFeilet: true,
            data: {},
        })
    });
});
