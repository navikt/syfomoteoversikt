import { describe, expect, it } from "vitest";
import { aktivEnhetMock, createDialogmote, veilederMock } from "../mocks/data";
import { stubDialogmoterVeilederidentApi } from "../mocks/stubDialogmoterApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { AktivEnhetContext } from "@/context/aktivEnhet/AktivEnhetContext";
import React from "react";
import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import MoteresponsColumn from "@/components/MoteresponsColumn";

const queryClient = new QueryClient();

const renderMoreresponsColumn = (dialogmote: DialogmoterDTO) =>
  render(
    <QueryClientProvider client={queryClient}>
      <AktivEnhetContext.Provider
        value={{
          aktivEnhet: aktivEnhetMock,
          setAktivEnhet: () => void 0,
        }}
      >
        <MoteresponsColumn dialogmote={dialogmote} />
      </AktivEnhetContext.Provider>
    </QueryClientProvider>
  );

const moteInnkalt = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  {},
  {}
);
const moteATHarLest = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  { lestDato: new Date() },
  {}
);
const moteATSvartAGHarLest = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  { lestDato: new Date(), svar: SvarType.KOMMER },
  { lestDato: new Date() }
);
const moteATEndringAGKommerIkke = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  { lestDato: new Date(), svar: SvarType.NYTT_TID_STED },
  { lestDato: new Date(), svar: SvarType.KOMMER_IKKE }
);
const moteATKommerAGKommerBehandlerKommer = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  { lestDato: new Date(), svar: SvarType.KOMMER },
  { lestDato: new Date(), svar: SvarType.KOMMER },
  SvarType.KOMMER
);

let moteATKommerAGKommerBehandlerIkkeSvart = createDialogmote(
  veilederMock,
  DialogmoteStatus.INNKALT,
  new Date(),
  { lestDato: new Date(), svar: SvarType.KOMMER },
  { lestDato: new Date(), svar: SvarType.KOMMER },
  SvarType.KOMMER
);

moteATKommerAGKommerBehandlerIkkeSvart = {
  ...moteATKommerAGKommerBehandlerIkkeSvart,
  behandler: {
    varselList: [
      {
        varselType: DialogmoteDeltakerVarselType.INNKALT,
        svar: [],
      },
    ],
  },
};

describe("MineMoter", () => {
  it("should render Ikke åpnet, Ikke åpnet", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [moteInnkalt]);
    renderMoreresponsColumn(moteInnkalt);

    expect(screen.getAllByText("Ikke åpnet")).to.have.length(2);
    expect(screen.queryByText("Behandler:")).to.not.exist;
  });

  it("should render Har åpnet, Ikke åpnet", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [moteATHarLest]);
    renderMoreresponsColumn(moteATHarLest);

    expect(screen.getAllByText("Har åpnet")).to.have.length(1);
    expect(screen.getAllByText("Ikke åpnet")).to.have.length(1);
    expect(screen.queryByText("Behandler:")).to.not.exist;
  });

  it("should render Kommer, Har åpnet", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [moteATSvartAGHarLest]);
    renderMoreresponsColumn(moteATSvartAGHarLest);

    expect(screen.getAllByText("Kommer")).to.have.length(1);
    expect(screen.getAllByText("Har åpnet")).to.have.length(1);
    expect(screen.queryByText("Behandler:")).to.not.exist;
  });

  it("should render Endring ønskes, Kommer ikke", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [moteATEndringAGKommerIkke]);
    renderMoreresponsColumn(moteATEndringAGKommerIkke);

    expect(screen.getAllByText("Endring ønskes")).to.have.length(1);
    expect(screen.getAllByText("Kommer ikke")).to.have.length(1);
    expect(screen.queryByText("Behandler:")).to.not.exist;
  });

  it("should render Kommer, Kommer, Kommer", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [
      moteATKommerAGKommerBehandlerKommer,
    ]);
    renderMoreresponsColumn(moteATKommerAGKommerBehandlerKommer);

    expect(screen.getAllByText("Kommer")).to.have.length(3);
  });

  it("should render Kommer, Kommer, Ikke svart", () => {
    stubDialogmoterVeilederidentApi(veilederMock, [
      moteATKommerAGKommerBehandlerIkkeSvart,
    ]);
    renderMoreresponsColumn(moteATKommerAGKommerBehandlerIkkeSvart);

    expect(screen.getAllByText("Kommer")).to.have.length(2);
    expect(screen.getAllByText("Ikke svart")).to.have.length(1);
  });
});
