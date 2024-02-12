import { expect } from "chai";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import React from "react";
import MineMoter from "@/sider/minemoter/MineMoter";
import {
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  aktivEnhetMock,
  annenVeilederMock,
  arbeidstakerMock,
  createDialogmote,
  veilederMock,
  virksomhetNavn,
} from "../mocks/data";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import { render, screen } from "@testing-library/react";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { apiMock } from "../mocks/stubApi";
import nock from "nock";
import { stubBrukernavnApi } from "../mocks/stubBrukernavnApi";
import { stubVirksomhetApi } from "../mocks/stubVirksomhetApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import { stubDialogmoterVeilederidentApi } from "../mocks/stubDialogmoterApi";

const yesterday = daysFromToday(-1);
const inFiveDays = daysFromToday(5);
const inTenDays = daysFromToday(10);

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    yesterday,
    { lestDato: new Date(), svar: SvarType.KOMMER_IKKE },
    {}
  ),
  createDialogmote(
    annenVeilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    inFiveDays
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    inTenDays,
    {},
    {},
    SvarType.KOMMER
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, daysFromToday(-2)),
  createDialogmote(veilederMock, DialogmoteStatus.NYTT_TID_STED, inFiveDays),
];

const queryClient = new QueryClient();
const scope = apiMock();

describe("MineMoter", () => {
  beforeEach(() => {
    stubBrukernavnApi(scope);
    stubVirksomhetApi(scope);
    stubAktivVeilederApi(scope, veilederMock);
    stubVeilederApi(scope, veilederMock);
    stubVeilederApi(scope, annenVeilederMock);
    stubDialogmoterVeilederidentApi(scope, veilederMock, dialogmoterData);
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("viser filter på respons", async () => {
    render(
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

    expect(await screen.findByRole("heading", { name: "Viser 3 møter" })).to
      .exist;

    expect(screen.getByText("Filtrer på respons")).to.exist;
    expect(screen.getByRole("option", { name: "Vis alle" })).to.exist;
    expect(screen.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(screen.getByRole("option", { name: "Respons mottatt" })).to.exist;
  });

  it("viser veileders aktive dialogmøte-innkallinger", async () => {
    render(
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

    expect(await screen.findByRole("heading", { name: "Viser 3 møter" })).to
      .exist;

    const headers = screen.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Velg",
      "Møtedato",
      "F.nr",
      "Navn",
      "Virksomhet",
      "Status",
      "Respons fra deltakere",
    ]);

    expect(
      await screen.findAllByText(arbeidstakerMock.navn, { exact: false })
    ).to.have.length.least(1);
    expect(
      await screen.findAllByText(virksomhetNavn, { exact: false })
    ).to.have.length.least(1);

    const rows = screen.getAllByRole("row");
    assertTableRows(rows, [
      "VelgMøtedatoF.nrNavnVirksomhetStatusRespons fra deltakere",
      `${getDatoFraZulu(yesterday)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Referat ikke sendtavlysning ønskes`,
      `${getDatoFraZulu(inFiveDays)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Endring sendt0/2 har åpnet`,
      `${getDatoFraZulu(inTenDays)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Innkalt (med behandler)1/3 kommer`,
    ]);
  });
});
