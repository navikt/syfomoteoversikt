import EnhetensMoter from "../../src/components/EnhetensMoter";
import React from "react";
import { MoteStatus } from "@/data/moter/moterTypes";
import {
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
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
} from "../mocks/data";
import { render, screen } from "@testing-library/react";
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
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER }
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    daysFromToday(2),
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER },
    SvarType.NYTT_TID_STED
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

  it("viser filter på respons, veileder og type", async () => {
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

    expect(await screen.findByRole("heading", { name: "Viser 5 møter" })).to
      .exist;

    expect(screen.getByText("Filtrer på respons")).to.exist;
    expect(screen.getByText("Filtrer på veileder")).to.exist;
    expect(screen.getByText("Filtrer på type")).to.exist;
    expect(screen.getAllByRole("option", { name: "Vis alle" })).to.have.length(
      3
    );
    expect(screen.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(screen.getByRole("option", { name: "Respons mottatt" })).to.exist;
    expect(await screen.findByRole("option", { name: veilederMock.navn })).to
      .exist;
    expect(screen.getByRole("option", { name: "Innkalling" })).to.exist;
    expect(screen.getByRole("option", { name: "Planlegger" })).to.exist;
  });

  it("viser enhetens aktive planlagte møter og dialogmøte-innkallinger", async () => {
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

    expect(await screen.findByRole("heading", { name: "Viser 5 møter" })).to
      .exist;

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
      `${getDatoFraZulu(daysFromToday(1))}${veilederMock.navn}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}Planlegger: Forslag0/2 svar`,
      `${getDatoFraZulu(daysFromToday(2))}${veilederMock.navn}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}Planlegger: Bekreftet`,
      `${getDatoFraZulu(daysFromToday(-1))}${veilederMock.navn}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}Møtedato passert2/2 kommer`,
      `${getDatoFraZulu(daysFromToday(2))}${veilederMock.navn}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}Innkalt (med lege)endring ønskes`,
      `${getDatoFraZulu(daysFromToday(5))}${veilederMock.navn}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}Endring sendt0/2 har åpnet`,
    ]);
  });
});
