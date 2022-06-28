import { expect } from "chai";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import React from "react";
import MineMoter from "../../src/components/MineMoter";
import {
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  aktivEnhetMock,
  annenVeilederMock,
  arbeidstakerMock,
  createDialogmote,
  veilederMock,
  virksomhetMock,
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

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    daysFromToday(-1),
    { lestDato: new Date(), svar: SvarType.KOMMER_IKKE },
    {}
  ),
  createDialogmote(
    annenVeilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    daysFromToday(5)
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    daysFromToday(10),
    {},
    {},
    SvarType.KOMMER
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, daysFromToday(-2)),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    daysFromToday(5)
  ),
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
      "Møtedato",
      "F.nr",
      "Navn",
      "Virksomhet",
      "Status",
      "Respons fra deltakere",
    ]);

    const rows = screen.getAllByRole("row");
    assertTableRows(rows, [
      "MøtedatoF.nrNavnVirksomhetStatusRespons fra deltakere",
      `${getDatoFraZulu(daysFromToday(-1))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Referat ikke sendtavlysning ønskes`,
      `${getDatoFraZulu(daysFromToday(5))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Endring sendt0/2 har åpnet`,
      `${getDatoFraZulu(daysFromToday(10))}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetMock.navn}Innkalt (med behandler)1/3 kommer`,
    ]);
  });
});
