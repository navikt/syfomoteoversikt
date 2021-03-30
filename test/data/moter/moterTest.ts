import { expect } from "chai";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import moter, { MoterState } from "../../../src/data/moter/moter";
import * as actions from "../../../src/data/virksomhet/virksomhet_actions";
import * as brukeractions from "../../../src/data/bruker/bruker_actions";
import { MoteDeltakerDTO, MoteDTO } from "../../../src/data/moter/moterTypes";

chai.use(chaiEnzyme());
const arbeidsgiverDeltager = {
  type: "arbeidsgiver",
} as MoteDeltakerDTO;
const brukerDeltager = {
  type: "Bruker",
} as MoteDeltakerDTO;
const emptyMoter: MoteDTO[] = [];

describe("moter", () => {
  it("Håndterer henterVirksomheter", () => {
    const action = actions.henterVirksomhet();
    const state = moter({ data: emptyMoter } as MoterState, action);
    expect(state).to.deep.equal({
      data: [],
    });
  });

  it("Setter virksomhetens navn på arbeidsgiver", () => {
    const action = actions.virksomhetHentet(
      {
        navn: "X-Files AS",
      },
      "moteUuid1"
    );
    const state = moter(
      {
        data: [
          {
            moteUuid: "moteUuid1",
            deltakere: [arbeidsgiverDeltager, brukerDeltager],
          },
        ],
      } as MoterState,
      action
    );
    expect(state).to.deep.equal({
      data: [
        {
          moteUuid: "moteUuid1",
          deltakere: [
            {
              type: "arbeidsgiver",
              virksomhet: "X-Files AS",
            },
            {
              type: "Bruker",
            },
          ],
        },
      ],
    });
  });

  it("Setter ikke virksomhetens navn på arbeidsgiver dersom uuid ikke matcher", () => {
    const action = actions.virksomhetHentet(
      {
        navn: "X-Files AS",
      },
      "moteUuid2"
    );
    const state = moter(
      {
        data: [
          {
            moteUuid: "moteUuid1",
            deltakere: [arbeidsgiverDeltager, brukerDeltager],
          },
        ],
      } as MoterState,
      action
    );
    expect(state).to.deep.equal({
      data: [
        {
          moteUuid: "moteUuid1",
          deltakere: [
            {
              type: "arbeidsgiver",
            },
            {
              type: "Bruker",
            },
          ],
        },
      ],
    });
  });

  it("Setter brukerens navn på bruker-deltakeren", () => {
    const action = brukeractions.brukerHentet(
      {
        navn: "navn",
      },
      "moteUuid1"
    );
    const state = moter(
      {
        data: [
          {
            moteUuid: "moteUuid1",
            deltakere: [arbeidsgiverDeltager, brukerDeltager],
          },
        ],
      } as MoterState,
      action
    );
    expect(state).to.deep.equal({
      data: [
        {
          moteUuid: "moteUuid1",
          deltakere: [
            {
              type: "arbeidsgiver",
            },
            {
              type: "Bruker",
              navn: "navn",
            },
          ],
        },
      ],
    });
  });

  it("Setter ikke brukerens navn dersom uuid ikke matcher", () => {
    const action = brukeractions.brukerHentet(
      {
        navn: "navn",
      },
      "moteUuid2"
    );
    const state = moter(
      {
        data: [
          {
            moteUuid: "moteUuid1",
            deltakere: [arbeidsgiverDeltager, brukerDeltager],
          },
        ],
      } as MoterState,
      action
    );
    expect(state).to.deep.equal({
      data: [
        {
          moteUuid: "moteUuid1",
          deltakere: [
            {
              type: "arbeidsgiver",
            },
            {
              type: "Bruker",
            },
          ],
        },
      ],
    });
  });
});
