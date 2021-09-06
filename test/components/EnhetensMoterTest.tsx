import { mount } from "enzyme";
import EnhetensMoter from "../../src/components/EnhetensMoter";
import React from "react";
import { MoteStatus } from "@/data/moter/moterTypes";
import { DialogmoteStatus } from "@/data/dialogmoter/dialogmoterTypes";
import { assertColumns, assertTableHeaders, daysFromToday } from "../testUtil";
import { Label } from "nav-frontend-skjema";
import { expect } from "chai";
import { MoteOversiktHeading } from "@/components/MoteOversiktHeading";
import MoteEnhet from "../../src/components/MoteEnhet";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { QueryClient, QueryClientProvider } from "react-query";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import {
  aktivEnhetMock,
  arbeidstakerMock,
  createDialogmote,
  createPlanlagtMote,
  veilederMock,
} from "../mocks/data";
import {
  mockBrukerQuery,
  mockDialogmoteQuery,
  mockFnrQuery,
  mockMoterEnhetQuery,
  mockVeilederQuery,
} from "../mocks/queries";

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    daysFromToday(-1),
    true
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    daysFromToday(5)
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, daysFromToday(-2)),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.FERDIGSTILT,
    daysFromToday(-3)
  ),
];
const moterData = [
  createPlanlagtMote(veilederMock, MoteStatus.OPPRETTET, daysFromToday(1)),
  createPlanlagtMote(
    veilederMock,
    MoteStatus.BEKREFTET,
    daysFromToday(2),
    true,
    true
  ),
  createPlanlagtMote(veilederMock, MoteStatus.AVBRUTT, daysFromToday(3)),
];

const queryClient = new QueryClient();
mockBrukerQuery(queryClient);
mockFnrQuery(queryClient);
mockDialogmoteQuery(queryClient, dialogmoterData);
mockMoterEnhetQuery(queryClient, moterData);
mockVeilederQuery(queryClient, veilederMock);

describe("EnhetensMoter", () => {
  it("viser filter på respons og veileder", () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AktivEnhetContext.Provider
          value={{
            aktivEnhet: aktivEnhetMock,
            setAktivEnhet: () => void 0,
          }}
        >
          <EnhetensMoter />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>
    );
    expect(wrapper.find(Label).at(0).text()).to.equal("Filtrer på respons");
    expect(wrapper.find(Label).at(1).text()).to.equal("Filtrer på veileder");
    const responsOptions = wrapper.find("select").at(0).find("option");
    const veilederOptions = wrapper.find("select").at(1).find("option");
    expect(responsOptions.at(0).text()).to.equal("Vis alle");
    expect(responsOptions.at(1).text()).to.equal("Ingen respons");
    expect(responsOptions.at(2).text()).to.equal("Respons mottatt");
    expect(veilederOptions.at(0).text()).to.equal("Vis alle");
    expect(veilederOptions.at(1).text()).to.equal(veilederMock.navn);
  });

  it("viser enhetens aktive planlagte møter og dialogmøte-innkallinger", () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AktivEnhetContext.Provider
          value={{
            aktivEnhet: aktivEnhetMock,
            setAktivEnhet: () => void 0,
          }}
        >
          <EnhetensMoter />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>
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
      veilederMock.navn,
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Innkalling: Dato passert",
      "1/2 har lest",
    ]);

    const planlagtMoteRow = wrapper.find(MoteEnhet).at(1);
    assertColumns(planlagtMoteRow, [
      "",
      getDatoFraZulu(daysFromToday(1)),
      veilederMock.navn,
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Planlegger: Forslag sendt",
      "0/2 svar",
    ]);

    const planlagtMoteBekreftetRow = wrapper.find(MoteEnhet).at(2);
    assertColumns(planlagtMoteBekreftetRow, [
      "",
      getDatoFraZulu(daysFromToday(2)),
      veilederMock.navn,
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Planlegger: Bekreftelse sendt",
      "2/2 svar",
    ]);

    const dialogmoteEndretRow = wrapper.find(MoteEnhet).at(3);
    assertColumns(dialogmoteEndretRow, [
      "",
      getDatoFraZulu(daysFromToday(5)),
      veilederMock.navn,
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Innkalling: Endret tid/sted",
      "0/2 har lest",
    ]);
  });
});
