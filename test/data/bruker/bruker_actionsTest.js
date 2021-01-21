const chai = require("chai");
import chaiEnzyme from "chai-enzyme";
import * as actions from "../../../src/data/bruker/bruker_actions";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("bruker_actions", () => {
  it("har en hentBruker-funksjon som returnerer riktig action", () => {
    const action = actions.hentBruker("fnr", "moteUuid");
    expect(action).to.deep.equal({
      type: "HENT_BRUKER_FORESPURT",
      ident: "fnr",
      moteUuid: "moteUuid",
    });
  });

  it("har en henterBruker-funksjon som returnerer riktig action", () => {
    const action = actions.henterBruker();
    expect(action).to.deep.equal({
      type: "HENTER_BRUKER",
    });
  });

  it("har en brukerHentet-funksjon som returnerer riktig action", () => {
    const action = actions.brukerHentet({ navn: "Berit" }, "moteUuid", "fnr");
    expect(action).to.deep.equal({
      type: "BRUKER_HENTET",
      data: {
        navn: "Berit",
      },
      moteUuid: "moteUuid",
    });
  });

  it("har en hentBrukerFeilet-funksjon som returnerer riktig action", () => {
    const action = actions.hentBrukerFeilet();
    expect(action).to.deep.equal({
      type: "HENT_BRUKER_FEILET",
    });
  });
});
