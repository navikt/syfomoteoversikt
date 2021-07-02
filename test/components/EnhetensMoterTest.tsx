import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EnhetensMoter from "../../src/components/EnhetensMoter";
import React from "react";
import { createStore } from "redux";
import { MoteStatus } from "../../src/data/moter/moterTypes";
import { DialogmoteStatus } from "../../src/data/dialogmoter/dialogmoterTypes";
import {
  assertColumn,
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
    assertColumn(dialogmotePassertRow, 1, getDatoFraZulu(daysFromToday(-1)));
    assertColumn(dialogmotePassertRow, 2, veileder.navn);
    assertColumn(dialogmotePassertRow, 3, arbeidstaker.fnr);
    assertColumn(dialogmotePassertRow, 4, arbeidstaker.navn);
    assertColumn(dialogmotePassertRow, 5, "Innkalling: Dato passert");
    assertColumn(dialogmotePassertRow, 6, "1/2 har lest");

    const planlagtMoteRow = wrapper.find(MoteEnhet).at(1);
    assertColumn(planlagtMoteRow, 1, getDatoFraZulu(daysFromToday(1)));
    assertColumn(planlagtMoteRow, 2, veileder.navn);
    assertColumn(planlagtMoteRow, 3, arbeidstaker.fnr);
    assertColumn(planlagtMoteRow, 4, arbeidstaker.navn);
    assertColumn(planlagtMoteRow, 5, "Planlegger: Forslag sendt");
    assertColumn(planlagtMoteRow, 6, "0/2 svar");

    const planlagtMoteBekreftetRow = wrapper.find(MoteEnhet).at(2);
    assertColumn(planlagtMoteBekreftetRow, 1, getDatoFraZulu(daysFromToday(2)));
    assertColumn(planlagtMoteBekreftetRow, 2, veileder.navn);
    assertColumn(planlagtMoteBekreftetRow, 3, arbeidstaker.fnr);
    assertColumn(planlagtMoteBekreftetRow, 4, arbeidstaker.navn);
    assertColumn(planlagtMoteBekreftetRow, 5, "Planlegger: Bekreftelse sendt");
    assertColumn(planlagtMoteBekreftetRow, 6, "2/2 svar");

    const dialogmoteEndretRow = wrapper.find(MoteEnhet).at(3);
    assertColumn(dialogmoteEndretRow, 1, getDatoFraZulu(daysFromToday(5)));
    assertColumn(dialogmoteEndretRow, 2, veileder.navn);
    assertColumn(dialogmoteEndretRow, 3, arbeidstaker.fnr);
    assertColumn(dialogmoteEndretRow, 4, arbeidstaker.navn);
    assertColumn(dialogmoteEndretRow, 5, "Innkalling: Endret tid/sted");
    assertColumn(dialogmoteEndretRow, 6, "0/2 har lest");
  });
});
