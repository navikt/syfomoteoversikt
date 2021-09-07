import EnhetensMoter from "../../src/components/EnhetensMoter";
import React from "react";
import { MoteStatus } from "@/data/moter/moterTypes";
import { DialogmoteStatus } from "@/data/dialogmoter/dialogmoterTypes";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import { expect } from "chai";
import { QueryClient, QueryClientProvider } from "react-query";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import {
  aktivEnhetMock,
  arbeidstakerMock,
  createDialogmote,
  createPlanlagtMote,
  veilederMock,
  virksomhetMock,
} from "../mocks/data";
import { render } from "@testing-library/react";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { apiMock } from "../mocks/stubApi";
import nock from "nock";
import { stubBrukerApi, stubFnrApi } from "../mocks/stubBrukerApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import { stubDialogmoterApi } from "../mocks/stubDialogmoterApi";
import { stubEnhetensMoterApi } from "../mocks/stubMoterApi";

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
const scope = apiMock();

describe("EnhetensMoter", () => {
  beforeEach(() => {
    stubBrukerApi(scope);
    stubFnrApi(scope);
    stubDialogmoterApi(scope, dialogmoterData);
    stubEnhetensMoterApi(scope, moterData);
    stubVeilederApi(scope, veilederMock);
    stubAktivVeilederApi(scope, veilederMock);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("viser filter på respons og veileder", async () => {
    const wrapper = render(
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

    expect(await wrapper.findByRole("heading", { name: "Viser 4 møter" })).to
      .exist;

    expect(wrapper.getByText("Filtrer på respons")).to.exist;
    expect(wrapper.getByText("Filtrer på veileder")).to.exist;
    expect(wrapper.getAllByRole("option", { name: "Vis alle" })).to.have.length(
      2
    );
    expect(wrapper.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(wrapper.getByRole("option", { name: "Respons mottatt" })).to.exist;
    expect(await wrapper.findByRole("option", { name: veilederMock.navn })).to
      .exist;
  });

  it("viser enhetens aktive planlagte møter og dialogmøte-innkallinger", async () => {
    const wrapper = render(
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

    expect(await wrapper.findByRole("heading", { name: "Viser 4 møter" })).to
      .exist;

    const headers = wrapper.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Velg",
      "Møtedato",
      "Veileder",
      "F.nr",
      "Sykmeldt",
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
      `${getDatoFraZulu(daysFromToday(21))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Planlegger: Bekreftelse sendt2/2 svar`,
      `${getDatoFraZulu(daysFromToday(5))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Innkalling: Endret tid/sted0/2 har lest`,
    ]);
  });
});
