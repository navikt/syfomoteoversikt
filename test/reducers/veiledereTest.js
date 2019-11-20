import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import veiledere from '../../src/js/reducers/veiledere';
import * as actions from '../../src/js/actions/veileder_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("veileder", () => {

    it("Har en default state", () => {
        const state = veiledere();
        expect(state).to.deep.equal({
            data: [],
        })
    });

    describe("henterVeileder", () => {

        it("Legger til nytt element dersom veiledern ikke finnes", () => {
            const action = actions.henterVeileder({ident: 'Z999999'});
            const state = veiledere({data: []}, action);
            expect(state).to.deep.equal({
                data: [{
                    ident: 'Z999999',
                    henter: true,
                    hentingFeilet: false,
                }],
            })
        });

    });
    //
    // it("Håndterer veilederHentet", () => {
    //     const action = actions.veilederHentet({
    //         navn: "Berit"
    //     });
    //     const state = veiledere({}, action);
    //     expect(state).to.deep.equal({
    //         data: {
    //             navn: "Berit"
    //         },
    //         henter: false,
    //         hentingFeilet: false
    //     })
    // });
    //
    // it("Håndterer hentVeilederFeilet", () => {
    //     const action = actions.hentVeilederFeilet();
    //     const state = veiledere({}, action);
    //     expect(state).to.deep.equal({
    //         data: {},
    //         henter: false,
    //         hentingFeilet: true,
    //     })
    // })
});
