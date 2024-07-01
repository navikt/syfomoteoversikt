import { erResponsMottatt, statusTekst } from "@/utils/dialogmoterUtil";
import {
  DialogmotedeltakerBehandlerDTO,
  DialogmotedeltakerBehandlerVarselDTO,
  DialogmotedeltakerVarselDTO,
  DialogmoteDeltakerVarselType,
  DialogmoterDTO,
  DialogmoteStatus,
  SvarType,
} from "@/data/dialogmoter/dialogmoterTypes";
import { describe, it, expect } from "vitest";
import { compareByMotedato } from "@/utils/moterUtil";
import { daysFromToday } from "../testUtil";

const lestDato = "2031-06-03T11:50:28.538";

describe("dialogmoterUtil statusTekst", () => {
  it("Returnerer 'Innkalt' for innkalling", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.INNKALT,
      daysFromToday(1)
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Innkalt");
  });
  it("Returnerer 'Referat ikke sendt' når dato har passert for innkalling", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.INNKALT,
      daysFromToday(-1)
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Referat ikke sendt");
  });
  it("Returnerer 'Endring sendt' for endret tid/sted", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.NYTT_TID_STED,
      daysFromToday(1)
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Endring sendt");
  });
  it("Returnerer 'Referat ikke sendt' når dato har passert for endret tid/sted", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.NYTT_TID_STED,
      daysFromToday(-1)
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Referat ikke sendt");
  });
  it("Returnerer 'Endring sendt (med behandler)' for endret tid/sted når lege er med", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.NYTT_TID_STED,
      daysFromToday(1),
      { varselList: [] }
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Endring sendt (med behandler)");
  });
  it("Returnerer 'Innkalt (med behandler)' for innkalling når lege er med", () => {
    const dialogmote = getDialogmote(
      DialogmoteStatus.INNKALT,
      daysFromToday(1),
      { varselList: [] }
    );

    const result = statusTekst(dialogmote);
    expect(result).to.equal("Innkalt (med behandler)");
  });
});

describe("dialogmoterUtil erResponsMottatt", () => {
  describe("ingen svar mottatt", () => {
    it("returnerer false når ingen har svart på innkalling", () => {
      const arbeidstakerVarsel = getVarsel(
        DialogmoteDeltakerVarselType.INNKALT,
        lestDato
      );
      const arbeidsgiverVarsel = getVarsel(
        DialogmoteDeltakerVarselType.INNKALT,
        lestDato
      );
      const dialogmote = getDialogmoteMedVarsler(
        DialogmoteStatus.INNKALT,
        [arbeidstakerVarsel],
        [arbeidsgiverVarsel]
      );

      const respons = erResponsMottatt(dialogmote as DialogmoterDTO);
      expect(respons).to.be.false;
    });
    it("returnerer false når ingen har svart på endring", () => {
      const arbeidstakerVarsel = getVarsel(
        DialogmoteDeltakerVarselType.NYTT_TID_STED
      );
      const arbeidsgiverVarsel = getVarsel(
        DialogmoteDeltakerVarselType.NYTT_TID_STED
      );
      const dialogmote = getDialogmoteMedVarsler(
        DialogmoteStatus.NYTT_TID_STED,
        [arbeidstakerVarsel],
        [arbeidsgiverVarsel]
      );

      const respons = erResponsMottatt(dialogmote as DialogmoterDTO);
      expect(respons).to.be.false;
    });
  });
  describe("svar mottatt", () => {
    it("returnerer true når noen har svart på innkalling", () => {
      const arbeidstakerVarsel = getVarsel(
        DialogmoteDeltakerVarselType.INNKALT,
        lestDato,
        SvarType.KOMMER
      );
      const arbeidsgiverVarsel = getVarsel(
        DialogmoteDeltakerVarselType.INNKALT,
        lestDato
      );
      const dialogmote = getDialogmoteMedVarsler(
        DialogmoteStatus.INNKALT,
        [arbeidstakerVarsel],
        [arbeidsgiverVarsel]
      );

      const respons = erResponsMottatt(dialogmote as DialogmoterDTO);
      expect(respons).to.be.true;
    });
    it("returnerer true når noen har svart på endring", () => {
      const arbeidstakerVarsel = getVarsel(
        DialogmoteDeltakerVarselType.NYTT_TID_STED
      );
      const arbeidsgiverVarsel = getVarsel(
        DialogmoteDeltakerVarselType.NYTT_TID_STED,
        lestDato,
        SvarType.NYTT_TID_STED
      );
      const dialogmote = getDialogmoteMedVarsler(
        DialogmoteStatus.NYTT_TID_STED,
        [arbeidstakerVarsel],
        [arbeidsgiverVarsel]
      );

      const respons = erResponsMottatt(dialogmote as DialogmoterDTO);
      expect(respons).to.be.true;
    });
  });
});

describe("dialogmoterUtil compareByMotedato", () => {
  it("Sorterer dialogmøter på tid eldste først", () => {
    const mote1 = getDialogmote(DialogmoteStatus.INNKALT, daysFromToday(1));
    const mote2 = getDialogmote(DialogmoteStatus.INNKALT, daysFromToday(-1));

    const moter = [mote1, mote2];
    const sorterteMoter = moter.sort(compareByMotedato());
    expect(sorterteMoter.length).to.equal(2);
    expect(sorterteMoter[0]).to.deep.equal(mote2);
    expect(sorterteMoter[1]).to.deep.equal(mote1);
  });
});

const getDialogmote = (
  status: DialogmoteStatus,
  tid: Date,
  behandler?: DialogmotedeltakerBehandlerDTO
) => {
  return {
    sted: "Videomøte",
    tid: tid.toISOString(),
    status,
    behandler,
  } as DialogmoterDTO;
};

const getDialogmoteMedVarsler = (
  status: DialogmoteStatus,
  arbeidstakerVarsler: DialogmotedeltakerVarselDTO[],
  arbeidsgiverVarsler: DialogmotedeltakerVarselDTO[],
  behandlerVarsler: DialogmotedeltakerBehandlerVarselDTO[] = []
) => {
  const dialogmote = {
    status,
    arbeidstaker: {
      varselList: arbeidstakerVarsler,
    },
    arbeidsgiver: {
      varselList: arbeidsgiverVarsler,
    },
  } as DialogmoterDTO;

  if (behandlerVarsler.length > 0) {
    dialogmote.behandler = { varselList: behandlerVarsler };
  }

  return dialogmote;
};

const getVarsel = (
  type: DialogmoteDeltakerVarselType,
  lestDato?: string,
  svar?: SvarType
) => {
  return {
    varselType: type,
    lestDato: lestDato || null,
    svar: svar ? { svarType: svar } : null,
  } as DialogmotedeltakerVarselDTO;
};
