import { addDaysToToday } from "../mockUtils";
import {
  DialogmoteDeltakerVarselType,
  DialogmoteStatus,
} from "../../src/data/dialogmoter/dialogmoterTypes";

const createDialogmote = (
  uuid: string,
  status: DialogmoteStatus,
  varselType: DialogmoteDeltakerVarselType,
  veileder: string,
  lestArbeidstakerVarsel: boolean,
  lestArbeidsgiverVarsel: boolean,
  dato: Date
) => {
  return {
    uuid,
    createdAt: "2021-02-26T12:31:46.126",
    updatedAt: "2021-02-26T12:31:46.126",
    status,
    opprettetAv: "Z990197",
    tildeltVeilederIdent: veileder,
    tildeltEnhet: "0314",
    arbeidstaker: {
      uuid: "85902bc3-86d5-4571-b06a-35e098f86928",
      personIdent: "10108000398",
      type: "ARBEIDSTAKER",
      varselList: [
        {
          uuid: "85902bc3-86d5-4571-b06a-35e098f86931",
          createdAt: "2021-02-26T12:31:46.126",
          varselType,
          digitalt: true,
          lestDato: lestArbeidstakerVarsel ? "2021-02-26T13:31:46.126" : null,
        },
      ],
    },
    arbeidsgiver: {
      uuid: "85902bc3-86d5-4571-b06a-35e098f86929",
      virksomhetsnummer: "974574861",
      type: "ARBEIDSGIVER",
      varselList: [
        {
          uuid: "85902bc3-86d5-4571-b06a-35e098f86931",
          createdAt: "2021-02-26T12:31:46.126",
          varselType,
          lestDato: lestArbeidsgiverVarsel ? "2021-02-27T13:31:46.126" : null,
        },
      ],
    },
    sted: "Månen",
    tid: dato.toISOString(),
    videoLink: "https://meet.google.com/xyz",
  };
};

const dialogmoter = [
  createDialogmote(
    "1",
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "S123456",
    true,
    true,
    addDaysToToday(2)
  ),
  createDialogmote(
    "2",
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "S123456",
    false,
    false,
    addDaysToToday(-2)
  ),
  createDialogmote(
    "3",
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "Z990197",
    true,
    false,
    addDaysToToday(1)
  ),
  createDialogmote(
    "4",
    DialogmoteStatus.AVLYST,
    DialogmoteDeltakerVarselType.AVLYST,
    "S123456",
    false,
    false,
    addDaysToToday(3)
  ),
  createDialogmote(
    "5",
    DialogmoteStatus.FERDIGSTILT,
    DialogmoteDeltakerVarselType.REFERAT,
    "Z990197",
    false,
    false,
    addDaysToToday(2)
  ),
];

export const dialogmoterMock = dialogmoter;
