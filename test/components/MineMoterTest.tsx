import { mount } from "enzyme";
import { Provider } from "react-redux";
import { expect } from "chai";
import { MoteOversiktHeading } from "../../src/components/MoteOversiktHeading";
import {
  assertColumn,
  assertTableHeaders,
  createDialogmote,
  createPlanlagtMote,
  daysFromToday,
} from "../testUtil";
import { getDatoFraZulu } from "../../src/utils/dateUtil";
import React from "react";
import { Label } from "nav-frontend-skjema";
import { createBrowserHistory } from "history";
import { createStore } from "redux";
import { createRootReducer } from "../../src/data/rootState";
import configureStore from "redux-mock-store";
import MineMoter from "../../src/components/MineMoter";
import { DialogmoteStatus } from "../../src/data/dialogmoter/dialogmoterTypes";
import { MoteStatus } from "../../src/data/moter/moterTypes";
import Mote from "../../src/components/Mote";

const arbeidstaker = {
  fnr: "10108000398",
  navn: "Arne Arbeidstaker",
};
const arbeidsgiver = {
  leder: "Korrupt Bolle",
  orgnummer: "974574861",
  virksomhet: "Skomaker Andersen",
};
const veileder = {
  ident: "Z990197",
  navn: "Vetle Veileder",
};
const annenVeileder = {
  ident: "S123456",
  navn: "Dana Scully",
};

const history = createBrowserHistory();
const realState = createStore(createRootReducer(history)).getState();
const mockStore = configureStore([]);
const mockState = {
  moter: {
    data: [
      createPlanlagtMote(
        veileder,
        arbeidstaker,
        arbeidsgiver,
        MoteStatus.OPPRETTET,
        daysFromToday(1)
      ),
      createPlanlagtMote(
        veileder,
        arbeidstaker,
        arbeidsgiver,
        MoteStatus.AVBRUTT,
        daysFromToday(3)
      ),
    ],
  },
  dialogmoter: {
    data: [
      createDialogmote(
        veileder,
        arbeidstaker,
        arbeidsgiver,
        DialogmoteStatus.INNKALT,
        daysFromToday(-1),
        true
      ),
      createDialogmote(
        annenVeileder,
        arbeidstaker,
        arbeidsgiver,
        DialogmoteStatus.NYTT_TID_STED,
        daysFromToday(5)
      ),
      createDialogmote(
        veileder,
        arbeidstaker,
        arbeidsgiver,
        DialogmoteStatus.AVLYST,
        daysFromToday(-2)
      ),
    ],
  },
  veiledere: {
    aktivVeileder: veileder.ident,
    data: [
      {
        ident: veileder.ident,
        navn: veileder.navn,
      },
      {
        ident: annenVeileder.ident,
        navn: annenVeileder.navn,
      },
    ],
  },
};

describe("MineMoter", () => {
  it("viser filter på respons", () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...realState, ...mockState })}>
        <MineMoter />
      </Provider>
    );

    expect(wrapper.find(Label).text()).to.equal("Filtrer på respons");
    const responsOptions = wrapper.find("select").find("option");
    expect(responsOptions.at(0).text()).to.equal("Vis alle");
    expect(responsOptions.at(1).text()).to.equal("Ingen respons");
    expect(responsOptions.at(2).text()).to.equal("Respons mottatt");
  });

  it("viser veileders aktive planlagte møter og dialogmøte-innkallinger", () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...realState, ...mockState })}>
        <MineMoter />
      </Provider>
    );

    console.log(wrapper.debug());

    expect(wrapper.find(MoteOversiktHeading).text()).to.equal("Viser 2 møter");
    assertTableHeaders(wrapper, [
      "Møtedato",
      "F.nr",
      "Navn",
      "Nærmeste leder",
      "Virksomhet",
      "Status",
      "Respons",
    ]);
    const dialogmotePassertRow = wrapper.find(Mote).at(0);
    assertColumn(dialogmotePassertRow, 0, getDatoFraZulu(daysFromToday(-1)));
    assertColumn(dialogmotePassertRow, 1, arbeidstaker.fnr);
    assertColumn(dialogmotePassertRow, 2, arbeidstaker.navn);
    assertColumn(dialogmotePassertRow, 3, "Korrupt Bolle");
    assertColumn(dialogmotePassertRow, 4, "Skomaker Andersen");
    assertColumn(dialogmotePassertRow, 5, "Innkalling: Dato passert");
    assertColumn(dialogmotePassertRow, 6, "1/2 har lest");

    const planlagtMoteRow = wrapper.find(Mote).at(1);
    assertColumn(planlagtMoteRow, 0, getDatoFraZulu(daysFromToday(1)));
    assertColumn(planlagtMoteRow, 1, arbeidstaker.fnr);
    assertColumn(planlagtMoteRow, 2, arbeidstaker.navn);
    assertColumn(dialogmotePassertRow, 3, "Korrupt Bolle");
    assertColumn(dialogmotePassertRow, 4, "Skomaker Andersen");
    assertColumn(planlagtMoteRow, 5, "Planlegger: Forslag sendt");
    assertColumn(planlagtMoteRow, 6, "0/2 svar");
  });
});
