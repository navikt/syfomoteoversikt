import { expect } from "chai";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import React from "react";
import MineMoter from "../../src/components/MineMoter";
import { DialogmoteStatus } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteStatus } from "@/data/moter/moterTypes";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  aktivEnhetMock,
  annenVeilederMock,
  arbeidstakerMock,
  createDialogmote,
  createPlanlagtMote,
  veilederMock,
  virksomhetMock,
} from "../mocks/data";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import { render } from "@testing-library/react";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { apiMock } from "../mocks/stubApi";
import nock from "nock";
import { stubBrukerApi, stubFnrApi } from "../mocks/stubBrukerApi";
import { stubVirksomhetApi } from "../mocks/stubVirksomhetApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import { stubDialogmoterApi } from "../mocks/stubDialogmoterApi";
import { stubVeiledersMoterApi } from "../mocks/stubMoterApi";

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
const scope = apiMock();

describe("MineMoter", () => {
  beforeEach(() => {
    stubBrukerApi(scope);
    stubFnrApi(scope);
    stubVirksomhetApi(scope);
    stubAktivVeilederApi(scope, veilederMock);
    stubVeilederApi(scope, veilederMock);
    stubVeilederApi(scope, annenVeilederMock);
    stubDialogmoterApi(scope, dialogmoterData);
    stubVeiledersMoterApi(scope, moterData);
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("viser filter på respons", async () => {
    const wrapper = render(
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

    expect(await wrapper.findByRole("heading", { name: "Viser 2 møter" })).to
      .exist;

    expect(wrapper.getByText("Filtrer på respons")).to.exist;
    expect(wrapper.getByRole("option", { name: "Vis alle" })).to.exist;
    expect(wrapper.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(wrapper.getByRole("option", { name: "Respons mottatt" })).to.exist;
  });

  it("viser veileders aktive planlagte møter og dialogmøte-innkallinger", async () => {
    const wrapper = render(
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

    expect(await wrapper.findByRole("heading", { name: "Viser 2 møter" })).to
      .exist;

    const headers = wrapper.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Møtedato",
      "F.nr",
      "Navn",
      "Virksomhet",
      "Status",
      "Respons",
    ]);

    const rows = wrapper.getAllByRole("row");
    assertTableRows(rows, [
      `${getDatoFraZulu(daysFromToday(-1))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Innkalling: Dato passert1/2 har lest`,
      `${getDatoFraZulu(daysFromToday(1))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Planlegger: Forslag sendt0/2 svar`,
    ]);
  });
});
