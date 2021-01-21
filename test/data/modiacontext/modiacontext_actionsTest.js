import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import * as actions from "../../../src/data/modiacontext/modiacontext_actions";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("modiacontext_actions", () => {
  it("har en hentAktivEnhet-funksjon som returnerer riktig action", () => {
    const action = actions.hentAktivEnhet({
      verdi: "0022",
      eventType: "NY_AKTIV_ENHET",
    });
    expect(action).to.deep.equal({
      type: actions.HENT_AKTIVENHET_FORESPURT,
      data: {
        verdi: "0022",
        eventType: "NY_AKTIV_ENHET",
      },
    });
  });

  it("har en henterAktivEnhet-funksjon som returnerer riktig action", () => {
    const action = actions.henterAktivEnhet();
    expect(action).to.deep.equal({
      type: actions.HENTER_AKTIVENHET,
    });
  });

  it("har en hentAktivEnhetFeilet-funksjon som returnerer riktig action", () => {
    const action = actions.hentAktivEnhetFeilet();
    expect(action).to.deep.equal({
      type: actions.HENT_AKTIVENHET_FEILET,
    });
  });

  it("har en pushModiaContext-funksjon som returnerer riktig action", () => {
    const action = actions.pushModiaContext({
      verdi: "verdi",
      eventType: "eventType",
    });
    expect(action).to.deep.equal({
      data: {
        eventType: "eventType",
        verdi: "verdi",
      },
      type: actions.PUSH_MODIACONTEXT_FORESPURT,
    });
  });

  it("har en pusherModiaContext-funksjon som returnerer riktig action", () => {
    const action = actions.pusherModiaContext();
    expect(action).to.deep.equal({
      type: actions.PUSHER_MODIACONTEXT,
    });
  });

  it("har en pushModiaContextFeilet-funksjon som returnerer riktig action", () => {
    const action = actions.pushModiaContextFeilet();
    expect(action).to.deep.equal({
      type: actions.PUSH_MODIACONTEXT_FEILET,
    });
  });

  it("har en modiaContextPushet-funksjon som returnerer riktig action", () => {
    const action = actions.modiaContextPushet();
    expect(action).to.deep.equal({
      type: actions.MODIACONTEXT_PUSHET,
    });
  });
});
