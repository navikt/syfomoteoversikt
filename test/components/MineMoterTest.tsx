import { describe, it, expect, beforeEach } from "vitest";
import {
  assertTableHeaders,
  assertTableRows,
  daysFromToday,
} from "../testUtil";
import React from "react";
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
import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { mockServer } from "../setup";
import { ISDIALOGMOTE_ROOT, SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { defaultErrorTexts } from "@/api/errors";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { stubBrukernavnApi } from "../mocks/stubBrukernavnApi";
import { stubVirksomhetApi } from "../mocks/stubVirksomhetApi";
import {
  stubAktivVeilederApi,
  stubVeilederApi,
} from "../mocks/stubVeilederApi";
import {
  filterUnfinishedMoter,
  stubDialogmoterVeilederidentApi,
} from "../mocks/stubDialogmoterApi";
import MineMoter from "@/sider/minemoter/MineMoter";
import {
  MoteoverforingProvider,
  useMoteoverforing,
} from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { dagensDatoKortFormat } from "@/utils/dateUtil";

const yesterday = daysFromToday(-1);
const inFiveDays = daysFromToday(5);
const inTenDays = daysFromToday(10);

const dialogmoterData = [
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    yesterday,
    { lestDato: new Date(), svar: SvarType.KOMMER_IKKE },
    {},
  ),
  createDialogmote(
    annenVeilederMock,
    DialogmoteStatus.NYTT_TID_STED,
    inFiveDays,
  ),
  createDialogmote(
    veilederMock,
    DialogmoteStatus.INNKALT,
    inTenDays,
    {},
    {},
    SvarType.KOMMER,
  ),
  createDialogmote(veilederMock, DialogmoteStatus.AVLYST, daysFromToday(-2)),
  createDialogmote(veilederMock, DialogmoteStatus.NYTT_TID_STED, inFiveDays),
];

const queryClient = new QueryClient();

describe("MineMoter", () => {
  beforeEach(() => {
    stubBrukernavnApi();
    stubVirksomhetApi();
    stubAktivVeilederApi(veilederMock);
    stubVeilederApi(veilederMock);
    stubVeilederApi(annenVeilederMock);
    stubDialogmoterVeilederidentApi(veilederMock, dialogmoterData);
    mockServer.use(
      http.get(`*${SYFOVEILEDER_ROOT}/v3/veiledere`, () =>
        HttpResponse.json([annenVeilederMock]),
      ),
    );
  });

  it.each([
    [500, defaultErrorTexts.generalError],
    [200, `Du har tildelt 3 møter til ${annenVeilederMock.fulltNavn()}`],
  ])(
    "shows assignment feedback above the action box for HTTP %s",
    async (status, message) => {
      mockServer.use(
        http.patch(`*${ISDIALOGMOTE_ROOT}/v2/dialogmote/tildel`, () =>
          HttpResponse.text(status === 200 ? "OK" : "Internal Server Error", {
            status,
          }),
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
            <MineMoter
              aktivVeileder={veilederMock}
              moter={filterUnfinishedMoter(veilederMock, dialogmoterData).map(
                (mote, index) => ({ ...mote, uuid: `dialogmote-${index}` }),
              )}
            />
          </AktivEnhetContext.Provider>
        </QueryClientProvider>,
      );

      expect(
        await screen.findByRole("option", {
          name: annenVeilederMock.fulltNavn(),
        }),
      ).toBeTruthy();
      expect(screen.queryByRole("alert")).toBeNull();
      fireEvent.change(
        screen.getByRole("combobox", { name: "Hvem vil du tildele møtene?" }),
        { target: { value: annenVeilederMock.ident } },
      );
      screen.getAllByRole("checkbox").forEach((checkbox) => {
        fireEvent.click(checkbox);
      });
      fireEvent.click(screen.getByRole("button", { name: "Tildel møter" }));

      const alert = await screen.findByRole("alert");
      const actionBox =
        screen.getByText("Viser 3 møter").parentElement?.parentElement;

      expect(alert.textContent).toContain(message);
      expect(actionBox?.contains(alert)).toBe(false);
      expect(
        alert.compareDocumentPosition(
          screen.getByRole("button", { name: "Tildel møter" }),
        ) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    },
  );

  it("announces meetings taken over with today's date", async () => {
    function MeetingsTakenOver() {
      const { dispatch } = useMoteoverforing();
      React.useEffect(() => {
        dispatch({
          type: MoteoverforingActionType.MarkerDialogmote,
          dialogmoteUuid: "dialogmote-uuid",
          overta: true,
        });
        dispatch({ type: MoteoverforingActionType.DialogmoterOverfort });
      }, [dispatch]);
      return (
        <MineMoter
          aktivVeileder={veilederMock}
          moter={filterUnfinishedMoter(veilederMock, dialogmoterData)}
        />
      );
    }

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AktivEnhetContext.Provider
          value={{ aktivEnhet: aktivEnhetMock, setAktivEnhet: () => void 0 }}
        >
          <MoteoverforingProvider>
            <MeetingsTakenOver />
          </MoteoverforingProvider>
        </AktivEnhetContext.Provider>
      </QueryClientProvider>,
    );

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Du har lagt til ett nytt møte");
    expect(alert.textContent).toContain(`Dato: ${dagensDatoKortFormat()}`);
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
          <MineMoter
            aktivVeileder={veilederMock}
            moter={filterUnfinishedMoter(veilederMock, dialogmoterData)}
          />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Viser 3 møter")).to.exist;

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
          <MineMoter
            aktivVeileder={veilederMock}
            moter={filterUnfinishedMoter(veilederMock, dialogmoterData)}
          />
        </AktivEnhetContext.Provider>
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Viser 3 møter")).to.exist;

    const headers = screen.getAllByRole("columnheader");
    assertTableHeaders(headers, [
      "Velg",
      "Møtedato",
      "F.nr",
      "Sykmeldt",
      "Virksomhet",
      "Status",
      "Respons fra deltakere",
    ]);

    expect(
      await screen.findAllByText(arbeidstakerMock.navn, { exact: false }),
    ).to.have.length.least(1);
    expect(
      await screen.findAllByText(virksomhetNavn, { exact: false }),
    ).to.have.length.least(1);

    const rows = screen.getAllByRole("row");
    assertTableRows(rows, [
      "VelgMøtedatoF.nrSykmeldtVirksomhetStatusRespons fra deltakere",
      `${getDatoFraZulu(yesterday)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Referat ikke sendtArbeidstaker:Kommer ikkeArbeidsgiver:Ikke åpnet`,
      `${getDatoFraZulu(inFiveDays)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Endring sendtArbeidstaker:Ikke åpnetArbeidsgiver:Ikke åpnet`,
      `${getDatoFraZulu(inTenDays)}${arbeidstakerMock.fnr}${
        arbeidstakerMock.navn
      }${virksomhetNavn}Innkalt (med behandler)Arbeidstaker:Ikke åpnetArbeidsgiver:Ikke åpnetBehandler:Kommer`,
    ]);
  });
});
