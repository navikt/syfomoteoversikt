import { addDaysToToday } from "../mockUtils";
import {
  DialogmotedeltakerBehandlerVarselDTO,
  DialogmotedeltakerVarselDTO,
  DialogmoteDeltakerVarselType,
  DialogmoteStatus,
  SvarType,
} from "../../data/dialogmoter/dialogmoterTypes";

const createDialogmote = (
  uuid: string,
  dato: Date,
  status: DialogmoteStatus,
  varselType: DialogmoteDeltakerVarselType,
  veileder: string,
  arbeidstakerVarsel: Partial<DialogmotedeltakerVarselDTO>,
  arbeidsgiverVarsel: Partial<DialogmotedeltakerVarselDTO>,
  behandlerVarsel?: Partial<DialogmotedeltakerBehandlerVarselDTO>
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
          ...arbeidstakerVarsel,
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
          ...arbeidsgiverVarsel,
        },
      ],
    },
    ...(behandlerVarsel
      ? {
          behandler: {
            varselList: [
              {
                varselType,
                svar: behandlerVarsel.svar || [],
              },
            ],
          },
        }
      : {}),
    sted: "Månen",
    tid: dato.toISOString(),
    videoLink: "https://meet.google.com/xyz",
  };
};

const dialogmoter = [
  createDialogmote(
    "1",
    addDaysToToday(2),
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "S123456",
    { lestDato: addDaysToToday(-1).toISOString() },
    { lestDato: addDaysToToday(-2).toISOString() }
  ),
  createDialogmote(
    "2",
    addDaysToToday(-2),
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "S123456",
    {},
    {}
  ),
  createDialogmote(
    "3",
    addDaysToToday(1),
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "Z990197",
    { lestDato: addDaysToToday(-1).toISOString() },
    {}
  ),
  createDialogmote(
    "4",
    addDaysToToday(3),
    DialogmoteStatus.AVLYST,
    DialogmoteDeltakerVarselType.AVLYST,
    "S123456",
    {},
    {}
  ),
  createDialogmote(
    "5",
    addDaysToToday(2),
    DialogmoteStatus.FERDIGSTILT,
    DialogmoteDeltakerVarselType.REFERAT,
    "Z990197",
    {},
    {}
  ),
  createDialogmote(
    "6",
    addDaysToToday(8),
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "Z990197",
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.KOMMER },
    },
    {}
  ),
  createDialogmote(
    "7",
    addDaysToToday(8),
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "Z990197",
    {},
    { lestDato: addDaysToToday(-1).toISOString() },
    { svar: [{ svarType: SvarType.KOMMER }] }
  ),
  createDialogmote(
    "8",
    addDaysToToday(9),
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "Z990197",
    {},
    {},
    { svar: [{ svarType: SvarType.NYTT_TID_STED }] }
  ),
  createDialogmote(
    "9",
    addDaysToToday(1),
    DialogmoteStatus.NYTT_TID_STED,
    DialogmoteDeltakerVarselType.NYTT_TID_STED,
    "Z990197",
    { lestDato: addDaysToToday(-1).toISOString() },
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.KOMMER_IKKE },
    }
  ),
  createDialogmote(
    "10",
    addDaysToToday(7),
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "Z990197",
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.NYTT_TID_STED },
    },
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.KOMMER_IKKE },
    }
  ),
  createDialogmote(
    "11",
    addDaysToToday(19),
    DialogmoteStatus.INNKALT,
    DialogmoteDeltakerVarselType.INNKALT,
    "Z990197",
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.NYTT_TID_STED },
    },
    {
      lestDato: addDaysToToday(-1).toISOString(),
      svar: { svarType: SvarType.KOMMER_IKKE },
    },
    { varselType: DialogmoteDeltakerVarselType.INNKALT, svar: [] }
  ),
];

export const dialogmoterMock = dialogmoter;
