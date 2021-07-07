const { addDaysToToday } = require("./mockUtils");
const createDialogmote = (
  uuid,
  status,
  varselType,
  veileder,
  lestArbeidstakerVarsel,
  lestArbeidsgiverVarsel,
  dato
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
      lederNavn: "Korrupt Bolle",
      lederEpost: "korrupt.bolle@nav.no",
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
    "INNKALT",
    "INNKALT",
    "S123456",
    true,
    true,
    addDaysToToday(2)
  ),
  createDialogmote(
    "2",
    "NYTT_TID_STED",
    "NYTT_TID_STED",
    "S123456",
    false,
    false,
    addDaysToToday(-2)
  ),
  createDialogmote(
    "3",
    "NYTT_TID_STED",
    "NYTT_TID_STED",
    "Z990197",
    true,
    false,
    addDaysToToday(1)
  ),
  createDialogmote(
    "4",
    "AVLYST",
    "AVLYST",
    "S123456",
    false,
    false,
    addDaysToToday(3)
  ),
  createDialogmote(
    "5",
    "FERDIGSTILT",
    "REFERAT",
    "Z990197",
    false,
    false,
    addDaysToToday(2)
  ),
];

module.exports = {
  getDialogmoter: dialogmoter,
};
