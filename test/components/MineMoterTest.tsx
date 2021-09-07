import { mount } from "enzyme";
import { expect } from "chai";
import { MoteOversiktHeading } from "@/components/MoteOversiktHeading";
import { assertColumns, assertTableHeaders, daysFromToday } from "../testUtil";
import { getDatoFraZulu } from "@/utils/dateUtil";
import React from "react";
import { Label } from "nav-frontend-skjema";
import MineMoter from "../../src/components/MineMoter";
import { DialogmoteStatus } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatus } from "@/data/moter/moterTypes";
import Mote from "../../src/components/Mote";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  aktivEnhetMock,
  annenVeilederMock,
  arbeidstakerMock,
  createDialogmote,
  createPlanlagtMote,
  veilederMock,
} from "../mocks/data";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import {
  mockAktivVeilederQuery,
  mockBrukerQuery,
  mockDialogmoteQuery,
  mockFnrQuery,
  mockVeilederQuery,
  mockVeiledersMoterQuery,
  mockVirksomhetQuery,
} from "../mocks/queries";

const moterData = [
  createPlanlagtMote(veilederMock, MoteStatus.OPPRETTET, daysFromToday(1)),
  createPlanlagtMote(veilederMock, MoteStatus.AVBRUTT, daysFromToday(3)),
];
const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    daysFromToday(-1),
    true
  ),
  createDialogmote(
    annenVeilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    daysFromToday(5)
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, daysFromToday(-2)),
];

const queryClient = new QueryClient();
mockBrukerQuery(queryClient);
mockFnrQuery(queryClient);
mockVirksomhetQuery(queryClient);
mockDialogmoteQuery(queryClient, dialogmoterData);
mockVeiledersMoterQuery(queryClient, moterData);
mockAktivVeilederQuery(queryClient, veilederMock);
mockVeilederQuery(queryClient, veilederMock);
mockVeilederQuery(queryClient, annenVeilederMock);

describe("MineMoter", () => {
  it("viser filter på respons", () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AktivEnhetContext.Provider
          value={{
            aktivEnhet: aktivEnhetMock,
            setAktivEnhet: () => void 0,
          }}
        >
          <MineMoter />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>
    );

    expect(wrapper.find(Label).text()).to.equal("Filtrer på respons");
    const responsOptions = wrapper.find("select").find("option");
    expect(responsOptions.at(0).text()).to.equal("Vis alle");
    expect(responsOptions.at(1).text()).to.equal("Ingen respons");
    expect(responsOptions.at(2).text()).to.equal("Respons mottatt");
  });

  it("viser veileders aktive planlagte møter og dialogmøte-innkallinger", () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AktivEnhetContext.Provider
          value={{
            aktivEnhet: aktivEnhetMock,
            setAktivEnhet: () => void 0,
          }}
        >
          <MineMoter />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>
    );

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
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Skomaker Andersen",
      "Innkalling: Dato passert",
      "1/2 har lest",
    ]);

    const planlagtMoteRow = wrapper.find(Mote).at(1);
    assertColumns(planlagtMoteRow, [
      getDatoFraZulu(daysFromToday(1)),
      arbeidstakerMock.fnr,
      arbeidstakerMock.navn,
      "Skomaker Andersen",
      "Planlegger: Forslag sendt",
      "0/2 svar",
    ]);
  });
});
