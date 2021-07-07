import { ReactWrapper } from "enzyme";
import { expect } from "chai";
import { MoteDTO, MoteStatus } from "../src/data/moter/moterTypes";
import {
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
} from "../src/data/dialogmoter/dialogmoterTypes";

export const daysFromToday = (days: number): Date => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() + days);
  return new Date(nyDato);
};

export const assertColumns = (
  row: ReactWrapper,
  expectedColumns: string[]
): void => {
  const columns = row.find("td");
  expectedColumns.forEach((expected, index) => {
    expect(columns.at(index).text()).to.equal(expected);
  });
};

export const assertTableHeaders = (
  wrapper: ReactWrapper,
  expectedHeaders: string[]
): void => {
  const tableHeaders = wrapper.find("th");
  expectedHeaders.forEach((expected, index) => {
    expect(tableHeaders.at(index).text()).to.equal(expected);
  });
};

export const createDialogmote = (
  veileder: { ident: string; navn: string },
  arbeidstaker: { fnr: string; navn: string },
  arbeidsgiver: { orgnummer: string; virksomhet: string },
  status: DialogmoteStatus,
  dato: Date,
  arbeidstakerSvar = false,
  arbeidsgiverSvar = false
): DialogmoterDTO =>
  (({
    sted: "video",
    status,
    arbeidsgiver: {
      virksomhetsnavn: arbeidsgiver.virksomhet,
      virksomhetsnummer: arbeidsgiver.orgnummer,
      varselList: [
        {
          varselType:
            DialogmoteStatus.INNKALT === status
              ? DialogmoteDeltakerVarselType.INNKALT
              : DialogmoteDeltakerVarselType.NYTT_TID_STED,
          lestDato: arbeidsgiverSvar ? new Date().toISOString() : null,
        },
      ],
    },
    arbeidstaker: {
      varselList: [
        {
          varselType:
            DialogmoteStatus.INNKALT === status
              ? DialogmoteDeltakerVarselType.INNKALT
              : DialogmoteDeltakerVarselType.NYTT_TID_STED,
          lestDato: arbeidstakerSvar ? new Date().toISOString() : null,
        },
      ],
      personIdent: arbeidstaker.fnr,
      navn: arbeidstaker.navn,
    },
    tid: dato.toISOString(),
    tildeltVeilederIdent: veileder.ident,
  } as unknown) as DialogmoterDTO);

export const createPlanlagtMote = (
  veileder: { ident: string; navn: string },
  arbeidstaker: { fnr: string; navn: string },
  arbeidsgiver: { leder: string; orgnummer: string; virksomhet: string },
  status: MoteStatus,
  dato: Date,
  arbeidstakerSvar = false,
  arbeidsgiverSvar = false
): MoteDTO =>
  (({
    status,
    sistEndret: daysFromToday(-3),
    deltakere: [
      {
        type: "BRUKER",
        fnr: arbeidstaker.fnr,
        navn: arbeidstaker.navn,
        svartidspunkt: arbeidstakerSvar ? new Date() : null,
      },
      {
        type: "ARBEIDSGIVER",
        svartidspunkt: arbeidsgiverSvar ? new Date() : null,
        navn: arbeidsgiver.leder,
        virksomhet: arbeidsgiver.virksomhet,
        orgnummer: arbeidsgiver.orgnummer,
      },
    ],
    bekreftetAlternativ: { tid: dato },
    alternativer: [{ tid: dato }],
    eier: veileder.ident,
  } as unknown) as MoteDTO);
