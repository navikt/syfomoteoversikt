function getDefaultDialogmote() {
  return {
    uuid: "85902bc3-86d5-4571-b06a-35e098f86927",
    createdAt: "2021-02-26T12:31:46.126",
    updatedAt: "2021-02-26T12:31:46.126",
    planlagtMoteUuid: "85902bc3-86d5-4571-b06a-35e098f86927",
    planlagtMoteBekreftetTidspunkt: "2019-11-26T13:31:46.126",
    status: "INNKALT",
    opprettetAv: "Z990197",
    tildeltVeilederIdent: "Z990197",
    tildeltEnhet: "0314",
    arbeidstaker: {
      uuid: "85902bc3-86d5-4571-b06a-35e098f86928",
      personIdent: "10108000398",
      type: "ARBEIDSTAKER",
      varselList: [
        {
          uuid: "85902bc3-86d5-4571-b06a-35e098f86931",
          createdAt: "2021-02-26T12:31:46.126",
          varselType: "INNKALT",
          digitalt: true,
          pdf: [],
          lestDato: "2021-02-26T13:31:46.126",
        },
      ],
    },
    arbeidsgiver: {
      uuid: "85902bc3-86d5-4571-b06a-35e098f86929",
      virksomhetsnummer: "974574861",
      lederNavn: "Korrupt Bolle",
      lederEpost: "korrupt.bolle@nav.no",
      type: "ARBEIDSGIVER",
    },
    tidStedList: [
      {
        uuid: "85902bc3-86d5-4571-b06a-35e098f86930",
        sted: "Månen",
        tid: "2021-03-26T12:31:46.126",
      },
    ],
  };
}

module.exports = {
  getDefaultDialogmote,
};
