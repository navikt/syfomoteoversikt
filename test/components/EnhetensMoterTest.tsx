import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EnhetensMoter from "../../src/components/EnhetensMoter";
import React from "react";
import { createStore } from "redux";
import { MoteStatus } from "../../src/data/moter/moterTypes";
import { DialogmoteStatus } from "../../src/data/dialogmoter/dialogmoterTypes";
import {
  assertColumns,
  assertTableHeaders,
  createDialogmote,
  createPlanlagtMote,
  daysFromToday,
} from "../testUtil";
import { Label } from "nav-frontend-skjema";
import { expect } from "chai";
import { MoteOversiktHeading } from "../../src/components/MoteOversiktHeading";
import MoteEnhet from "../../src/components/MoteEnhet";
import { getDatoFraZulu } from "../../src/utils/dateUtil";
import { rootReducer } from "../../src/data/rootState";

const arbeidstaker = {
  fnr: "10108000398",
  navn: "Arne Arbeidstaker",
};
const veileder = {
  ident: "Z990197",
  navn: "Vetle Veileder",
};
const arbeidsgiver = {
  leder: "Korrupt Bolle",
  orgnummer: "974574861",
  virksomhet: "Skomaker Andersen",
};

const realState = createStore(rootReducer).getState();
const mockStore = configureStore([]);
const mockState = {
  moterEnhet: {
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
        MoteStatus.BEKREFTET,
        daysFromToday(2),
        true,
        true
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
        veileder,
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
      createDialogmote(
        veileder,
        arbeidstaker,
        arbeidsgiver,
        DialogmoteStatus.FERDIGSTILT,
        daysFromToday(-3)
      ),
    ],
  },
  veiledere: {
    data: [
      {
        ident: veileder.ident,
        navn: veileder.navn,
      },
    ],
  },
};

describe("EnhetensMoter", () => {
  it("viser filter på respons og veileder", () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...realState, ...mockState })}>
        <EnhetensMoter />
      </Provider>
    );
    expect(wrapper.find(Label).at(0).text()).to.equal("Filtrer på respons");
    expect(wrapper.find(Label).at(1).text()).to.equal("Filtrer på veileder");
    const responsOptions = wrapper.find("select").at(0).find("option");
    const veilederOptions = wrapper.find("select").at(1).find("option");
    expect(responsOptions.at(0).text()).to.equal("Vis alle");
    expect(responsOptions.at(1).text()).to.equal("Ingen respons");
    expect(responsOptions.at(2).text()).to.equal("Respons mottatt");
    expect(veilederOptions.at(0).text()).to.equal("Vis alle");
    expect(veilederOptions.at(1).text()).to.equal(veileder.navn);
  });

  it("viser enhetens aktive planlagte møter og dialogmøte-innkallinger", () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...realState, ...mockState })}>
        <EnhetensMoter />
      </Provider>
    );
    expect(wrapper.find(MoteOversiktHeading).text()).to.equal("Viser 4 møter");
    assertTableHeaders(wrapper, [
      "Velg",
      "Møtedato",
      "Veileder",
      "F.nr",
      "Sykmeldt",
      "Status",
      "Respons",
    ]);

    const dialogmotePassertRow = wrapper.find(MoteEnhet).at(0);
    assertColumns(dialogmotePassertRow, [
      "",
      getDatoFraZulu(daysFromToday(-1)),
      veileder.navn,
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Innkalling: Dato passert",
      "1/2 har lest",
    ]);

    const planlagtMoteRow = wrapper.find(MoteEnhet).at(1);
    assertColumns(planlagtMoteRow, [
      "",
      getDatoFraZulu(daysFromToday(1)),
      veileder.navn,
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Planlegger: Forslag sendt",
      "0/2 svar",
    ]);

    const planlagtMoteBekreftetRow = wrapper.find(MoteEnhet).at(2);
    assertColumns(planlagtMoteBekreftetRow, [
      "",
      getDatoFraZulu(daysFromToday(2)),
      veileder.navn,
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Planlegger: Bekreftelse sendt",
      "2/2 svar",
    ]);

    const dialogmoteEndretRow = wrapper.find(MoteEnhet).at(3);
    assertColumns(dialogmoteEndretRow, [
      "",
      getDatoFraZulu(daysFromToday(5)),
      veileder.navn,
      arbeidstaker.fnr,
      arbeidstaker.navn,
      "Innkalling: Endret tid/sted",
      "0/2 har lest",
    ]);
  });
});
