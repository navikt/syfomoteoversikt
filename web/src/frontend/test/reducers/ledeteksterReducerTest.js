import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import ledetekster from '../../js/reducers/ledetekster.js';
import * as actions from '../../js/actions/ledetekster_actions';

describe('ledetekster', () => {

    it('håndterer LEDETEKSTER_HENTET ', () => {
        const initialState = deepFreeze({});
        const action = actions.ledeteksterHentet({
            "nokkel.1": "Verdi 1",
            "nokkel.2": "Verdi 2",
            "nokkel.3": "Verdi 3"
        });
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                "nokkel.1": "Verdi 1",
                "nokkel.2": "Verdi 2",
                "nokkel.3": "Verdi 3"
            },
            henter: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENTER_LEDETEKSTER ", () => {
        const initialState = deepFreeze({});
        const action = actions.henterLedetekster();
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: true,
            hentingFeilet: false,
        });        
    });

    it("Håndterer HENT_LEDETEKSTER_FEILET ", () => {
        const initialState = deepFreeze({});
        const action = actions.hentLedeteksterFeilet();
        const nextState = ledetekster(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: true,
        });        
    });

}); 