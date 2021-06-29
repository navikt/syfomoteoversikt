import {
  antallLesteVarslerTekst,
  dialogmoteStatusTekst,
  getDialogmoteRespons,
} from "../../src/utils/dialogmoterUtil";
import {
  DialogmotedeltakerVarselDTO,
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmoter/dialogmoterTypes";
import { expect } from "chai";
import { MoteDTO } from "../../src/data/moter/moterTypes";
import { compareByMotedato } from "../../src/utils/moterUtil";

const lestDato = "2031-06-03T11:50:28.538";

describe("dialogmoterUtil antallLesteVarslerTekst", () => {
  it("viser 0 har lest når ingen har lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)]
    );
    const respons = antallLesteVarslerTekst(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("0/2 har lest");
  });
  it("viser 1/2 har lest når arbeidstaker har lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT, lestDato)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)]
    );
    const respons = antallLesteVarslerTekst(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("1/2 har lest");
  });
  it("viser 1/2 har lest når arbeidsgiver har lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT, lestDato)]
    );
    const respons = antallLesteVarslerTekst(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("1/2 har lest");
  });
  it("viser 2/2 har lest når arbeidsgiver og arbeidstaker har lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT, lestDato)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT, lestDato)]
    );
    const respons = antallLesteVarslerTekst(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("2/2 har lest");
  });
});

describe("dialogmoterUtil dialogmoteStatusTekst", () => {
  it("Returnerer riktig tekst for innkalling", () => {
    const dialogmote = getDialogmote(DialogmoteStatus.INNKALT, imorgen());
    const statusTekst = dialogmoteStatusTekst(dialogmote);
    expect(statusTekst).to.equal("Innkalling: Sendt");
  });
  it("Returnerer riktig tekst når dato har passert for innkalling", () => {
    const dialogmote = getDialogmote(DialogmoteStatus.INNKALT, igaar());
    const statusTekst = dialogmoteStatusTekst(dialogmote);
    expect(statusTekst).to.equal("Innkalling: Dato passert");
  });
  it("Returnerer riktig tekst for endret tid/sted", () => {
    const dialogmote = getDialogmote(DialogmoteStatus.NYTT_TID_STED, imorgen());
    const statusTekst = dialogmoteStatusTekst(dialogmote);
    expect(statusTekst).to.equal("Innkalling: Endret tid/sted");
  });
  it("Returnerer riktig tekst når dato har passert for endret tid/sted", () => {
    const dialogmote = getDialogmote(DialogmoteStatus.NYTT_TID_STED, igaar());
    const statusTekst = dialogmoteStatusTekst(dialogmote);
    expect(statusTekst).to.equal("Innkalling: Dato passert");
  });
});

describe("dialogmoterUtil getDialogmoteRespons", () => {
  it("Innkalling skal returnere Respons mottatt hvis minst et varsel om innkalling er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT, lestDato)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)]
    );
    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Respons mottatt");
  });
  it("Innkalling skal returnere Ingen respons hvis ingen varsel om innkalling er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.INNKALT,
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)],
      [getVarsel(DialogmoteDeltakerVarselType.INNKALT)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Ingen respons");
  });
  it("Endret tid/sted skal returnere Respons mottatt hvis minst et varsel om endret tid/sted er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.NYTT_TID_STED,
      [getVarsel(DialogmoteDeltakerVarselType.NYTT_TID_STED)],
      [getVarsel(DialogmoteDeltakerVarselType.NYTT_TID_STED, lestDato)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Respons mottatt");
  });
  it("Endret tid/sted skal returnere Ingen respons hvis ingen varsel om endret tid/sted er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.NYTT_TID_STED,
      [getVarsel(DialogmoteDeltakerVarselType.NYTT_TID_STED)],
      [getVarsel(DialogmoteDeltakerVarselType.NYTT_TID_STED)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Ingen respons");
  });
  it("Avlyst møte skal returnere Respons mottatt hvis minst et varsel om avlysning er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.AVLYST,
      [getVarsel(DialogmoteDeltakerVarselType.AVLYST)],
      [getVarsel(DialogmoteDeltakerVarselType.AVLYST, lestDato)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Respons mottatt");
  });
  it("Avlyst møte skal returnere Ingen respons hvis ingen varsel om avlysning er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.AVLYST,
      [getVarsel(DialogmoteDeltakerVarselType.AVLYST)],
      [getVarsel(DialogmoteDeltakerVarselType.AVLYST)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Ingen respons");
  });
  it("Ferdigstilt møte skal returnere Respons mottatt hvis minst et varsel om referat er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.FERDIGSTILT,
      [getVarsel(DialogmoteDeltakerVarselType.REFERAT)],
      [getVarsel(DialogmoteDeltakerVarselType.REFERAT, lestDato)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Respons mottatt");
  });
  it("Ferdigstilt møte skal returnere Ingen respons hvis ingen varsel om referat er lest", () => {
    const dialogmote = getDialogmoteMedVarsler(
      DialogmoteStatus.FERDIGSTILT,
      [getVarsel(DialogmoteDeltakerVarselType.REFERAT)],
      [getVarsel(DialogmoteDeltakerVarselType.REFERAT)]
    );

    const respons = getDialogmoteRespons(dialogmote as DialogmoterDTO);
    expect(respons).to.equal("Ingen respons");
  });
});

describe("dialogmoterUtil compareByMotedato", () => {
  it("Sorterer dialogmøter på tid eldste først", () => {
    const mote1 = getDialogmote(DialogmoteStatus.INNKALT, imorgen());
    const mote2 = getDialogmote(DialogmoteStatus.INNKALT, igaar());

    const moter = [mote1, mote2];
    const sorterteMoter = moter.sort(compareByMotedato());
    expect(sorterteMoter.length).to.equal(2);
    expect(sorterteMoter[0]).to.deep.equal(mote2);
    expect(sorterteMoter[1]).to.deep.equal(mote1);
  });
});

const getDialogmote = (status: DialogmoteStatus, tid: Date) => {
  return {
    sted: "Videomøte",
    tid: tid.toISOString(),
    status,
  } as DialogmoterDTO;
};

const getDialogmoteMedVarsler = (
  status: DialogmoteStatus,
  arbeidstakerVarsler: DialogmotedeltakerVarselDTO[],
  arbeidsgiverVarsler: DialogmotedeltakerVarselDTO[]
) => {
  return {
    status,
    arbeidstaker: {
      varselList: arbeidstakerVarsler,
    },
    arbeidsgiver: {
      varselList: arbeidsgiverVarsler,
    },
  } as DialogmoterDTO;
};

const getVarsel = (type: DialogmoteDeltakerVarselType, lestDato?: string) => {
  return {
    varselType: type,
    lestDato: lestDato || null,
  } as DialogmotedeltakerVarselDTO;
};

const imorgen = () => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() + 1);
  return new Date(nyDato);
};

const igaar = () => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() - 1);
  return new Date(nyDato);
};