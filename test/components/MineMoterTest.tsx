import { mount } from "enzyme";
import { Provider } from "react-redux";
import { expect } from "chai";
import { MoteOversiktHeading } from "@/components/MoteOversiktHeading";
import {
  assertColumns,
  assertTableHeaders,
  createDialogmote,
  createPlanlagtMote,
  daysFromToday,
} from "../testUtil";
import { getDatoFraZulu } from "@/utils/dateUtil";
import React from "react";
import { Label } from "nav-frontend-skjema";
import { createStore } from "redux";
import { rootReducer } from "@/data/rootState";
import configureStore from "redux-mock-store";
import MineMoter from "../../src/components/MineMoter";
import { DialogmoteStatus } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatus } from "@/data/moter/moterTypes";
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

const realState = createStore(rootReducer).getState();
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
      "Virksomhet",
      "Status",
      "Respons",
    ]);
    const dialogmotePassertRow = wrapper.find(Mote).at(0);
    assertColumns(dialogmotePassertRow, [
      getDatoFraZulu(daysFromToday(-1)),
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Skomaker Andersen",
      "Innkalling: Dato passert",
      "1/2 har lest",
    ]);

    const planlagtMoteRow = wrapper.find(Mote).at(1);
    assertColumns(planlagtMoteRow, [
      getDatoFraZulu(daysFromToday(1)),
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Skomaker Andersen",
      "Planlegger: Forslag sendt",
      "0/2 svar",
    ]);
  });
});
