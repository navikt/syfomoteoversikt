import React from "react";
import {
  DialogmoteDeltakerVarselType,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import { beforeEach, describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import {
  aktivEnhetMock,
  arbeidsgiverMock,
  arbeidstakerMock,
  createDialogmote,
  veilederMock,
} from "../mocks/data";
import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { mockServer } from "../setup";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { defaultErrorTexts } from "@/api/errors";
import { MoteoverforingProvider } from "@/context/moteoverforing/MoteoverforingContext";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { stubBrukernavnApi } from "../mocks/stubBrukernavnApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import { stubDialogmoterApi } from "../mocks/stubDialogmoterApi";
import { stubVirksomhetApi } from "../mocks/stubVirksomhetApi.ts";
import EnhetensMoter from "@/sider/enhetensmoter/EnhetensMoter.tsx";

const yesterday = daysFromToday(-1);
const inTwoDays = daysFromToday(2);
const inFiveDays = daysFromToday(5);
const threeDaysAgo = daysFromToday(-3);
const twoDaysAgo = daysFromToday(-2);
const inSevenDays = daysFromToday(7);

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    yesterday,
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER },
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    inTwoDays,
    { lestDato: new Date(), svar: SvarType.KOMMER },
    { lestDato: new Date(), svar: SvarType.KOMMER },
    SvarType.NYTT_TID_STED,
  ),
  createDialogmote(veilederMock, DialogmoteStatus.NYTT_TID_STED, inFiveDays),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.ENDRET,
    inSevenDays,
    { lestDato: new Date(), svar: SvarType.KOMMER },
    {},
    SvarType.KOMMER,
    DialogmoteDeltakerVarselType.INNKALT,
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, twoDaysAgo),
  createDialogmote(veilederMock, DialogmoteStatus.FERDIGSTILT, threeDaysAgo),
];
const queryClient = new QueryClient();

describe("EnhetensMoter", () => {
  beforeEach(() => {
    stubBrukernavnApi();
    stubVirksomhetApi();
    stubDialogmoterApi(dialogmoterData);
    stubVeilederApi(veilederMock);
    stubAktivVeilederApi(veilederMock);
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
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Viser 4 møter")).to.exist;

    expect(screen.getByText("Filtrer på respons")).to.exist;
    expect(screen.getByText("Filtrer på veileder")).to.exist;
    expect(screen.getAllByRole("option", { name: "Vis alle" })).to.have.length(
      2,
    );
    expect(screen.getByRole("option", { name: "Ingen respons" })).to.exist;
    expect(screen.getByRole("option", { name: "Respons mottatt" })).to.exist;
    expect(
      await screen.findByRole("option", { name: veilederMock.fulltNavn() }),
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
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Viser 4 møter")).to.exist;

    const headers = screen.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Velg",
      "Møtedato",
      "Veileder",
      "F.nr",
      "Sykmeldt",
      "Virksomhet",
      "Status",
      "Respons fra deltakere",
    ]);

    const rows = screen.getAllByRole("row");
    assertTableRows(rows, [
      "VelgMøtedatoVeilederF.nrSykmeldtVirksomhetStatusRespons fra deltakere",
      `${getDatoFraZulu(yesterday)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}${
        arbeidsgiverMock.virksomhet
      }Referat ikke sendtArbeidstaker:KommerArbeidsgiver:Kommer`,
      `${getDatoFraZulu(inTwoDays)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}${
        arbeidsgiverMock.virksomhet
      }Innkalt (med behandler)Arbeidstaker:KommerArbeidsgiver:KommerBehandler:Endring ønskes`,
      `${getDatoFraZulu(inFiveDays)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}${
        arbeidsgiverMock.virksomhet
      }Endring sendtArbeidstaker:Ikke åpnetArbeidsgiver:Ikke åpnet`,
      `${getDatoFraZulu(inSevenDays)}${veilederMock.fulltNavn()}${
        arbeidstakerMock.fnr
      }${arbeidstakerMock.navn}${
        arbeidsgiverMock.virksomhet
      }Endring sendt (med behandler)Arbeidstaker:KommerArbeidsgiver:Ikke åpnetBehandler:Kommer`,
    ]);
  });

  it("shows transfer errors above and outside the action box", async () => {
    stubDialogmoterApi(
      dialogmoterData.map((mote, index) => ({
        ...mote,
        uuid: `dialogmote-${index}`,
      })),
    );
    mockServer.use(
      http.post(`*${ISDIALOGMOTE_ROOT}/v2/dialogmote/overta`, () =>
        HttpResponse.text("Internal Server Error", { status: 500 }),
      ),
    );

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AktivEnhetContext.Provider
          value={{
            aktivEnhet: aktivEnhetMock,
            setAktivEnhet: () => void 0,
          }}
        >
          <MoteoverforingProvider>
            <EnhetensMoter />
          </MoteoverforingProvider>
        </AktivEnhetContext.Provider>
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Viser 4 møter")).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
    screen.getAllByRole("checkbox").forEach((checkbox) => {
      fireEvent.click(checkbox);
    });
    fireEvent.click(screen.getByRole("button", { name: "Overta møter" }));

    const alert = await screen.findByRole("alert");
    const button = screen.getByRole("button", { name: "Overta møter" });
    const actionBox = button.parentElement;

    expect(alert.textContent).toContain(defaultErrorTexts.generalError);
    expect(actionBox?.contains(alert)).toBe(false);
    expect(
      alert.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
