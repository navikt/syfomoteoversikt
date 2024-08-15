import EnhetensMoter from "@/sider/enhetensmoter/EnhetensMoter";
import React from "react";
import {
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import {
  aktivEnhetMock,
  arbeidstakerMock,
  createDialogmote,
  veilederMock,
} from "../mocks/data";
import { render, screen } from "@testing-library/react";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { apiMock } from "../mocks/stubApi";
import nock from "nock";
import { stubBrukernavnApi } from "../mocks/stubBrukernavnApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import { stubDialogmoterApi } from "../mocks/stubDialogmoterApi";

const yesterday = daysFromToday(-1);
const inTwoDays = daysFromToday(2);
const inFiveDays = daysFromToday(5);
const threeDaysAgo = daysFromToday(-3);
const twoDaysAgo = daysFromToday(-2);

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    yesterday,
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER }
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    inTwoDays,
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER },
    SvarType.NYTT_TID_STED
  ),
  createDialogmote(veilederMock, DialogmoteStatus.NYTT_TID_STED, inFiveDays),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, twoDaysAgo),
  createDialogmote(veilederMock, DialogmoteStatus.FERDIGSTILT, threeDaysAgo),
];
const queryClient = new QueryClient();
const scope = apiMock();

describe("EnhetensMoter", () => {
  beforeEach(() => {
    stubBrukernavnApi(scope);
    stubDialogmoterApi(scope, dialogmoterData);
    stubVeilederApi(scope, veilederMock);
    stubAktivVeilederApi(scope, veilederMock);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("viser filter på respons og veileder", async () => {
    render(
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

    expect(await screen.findByText("Viser 3 møter")).to.exist;

    expect(screen.getByText("Filtrer på respons")).to.exist;
    expect(screen.getByText("Filtrer på veileder")).to.exist;
    expect(screen.getAllByRole("option", { name: "Vis alle" })).to.have.length(
      2
    );
    expect(screen.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(screen.getByRole("option", { name: "Respons mottatt" })).to.exist;
    expect(
      await screen.findByRole("option", { name: veilederMock.fulltNavn() })
    ).to.exist;
  });

  it("viser enhetens aktive dialogmøte-innkallinger", async () => {
    render(
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

    expect(await screen.findByText("Viser 3 møter")).to.exist;

    const headers = screen.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Velg",
      "Møtedato",
      "Veileder",
      "F.nr",
      "Sykmeldt",
      "Status",
      "Respons fra deltakere",
    ]);

    const rows = screen.getAllByRole("row");
    assertTableRows(rows, [
      "VelgMøtedatoVeilederF.nrSykmeldtStatusRespons fra deltakere",
      `${getDatoFraZulu(yesterday)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${
        arbeidstakerMock.navn
      }Referat ikke sendtArbeidstaker:KommerArbeidsgiver:Kommer`,
      `${getDatoFraZulu(inTwoDays)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${
        arbeidstakerMock.navn
      }Innkalt (med behandler)Arbeidstaker:KommerArbeidsgiver:KommerBehandler:Endring ønskes`,
      `${getDatoFraZulu(inFiveDays)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${
        arbeidstakerMock.navn
      }Endring sendtArbeidstaker:Ikke åpnetArbeidsgiver:Ikke åpnet`,
    ]);
  });
});
