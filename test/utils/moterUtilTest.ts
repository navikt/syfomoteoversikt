import {
  antallDeltakerSvarTekst,
  compareByMotedato,
  getMoteRespons,
  moteStatusTekst,
} from "@/utils/moterUtil";
import { MoteDTO, MoteStatus } from "@/data/moter/moterTypes";
import { expect } from "chai";

describe("moterUtil antallDeltakerSvarTekst", () => {
  it("skal vise 0 svar", () => {
    const mote = createMote(MoteStatus.OPPRETTET);
    const svarStatus = antallDeltakerSvarTekst((mote as unknown) as MoteDTO);
    expect(svarStatus).to.equal("0/2 svar");
  });

  it("skal vise 1 svar", () => {
    const mote = getMoteMedEttSvar();
    const svarStatus = antallDeltakerSvarTekst((mote as unknown) as MoteDTO);
    expect(svarStatus).to.equal("1/2 svar");
  });

  it("skal vise 2 svar når begge har svart på et alternativ", () => {
    const mote = getMoteMedBeggeSvar();
    const svarStatus = antallDeltakerSvarTekst((mote as unknown) as MoteDTO);
    expect(svarStatus).to.equal("2/2 svar");
  });

  it("skal vise 2 svar når begge har svart på alle alternativer", () => {
    const mote = getMoteMedBeggeSvarBeggeAlternativer();
    const svarStatus = antallDeltakerSvarTekst((mote as unknown) as MoteDTO);
    expect(svarStatus).to.equal("2/2 svar");
  });
});

describe("moterUtil moteStatusTekst", () => {
  it("Skal returnere riktig status for møte som er opprettet og svar ikke mottatt", () => {
    const _mote = createMote(MoteStatus.OPPRETTET) as unknown;
    expect(moteStatusTekst(_mote as MoteDTO)).to.deep.equal(
      "Planlegger: Forslag sendt"
    );
  });

  it("Skal returnere riktig status for møte som er opprettet og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.OPPRETTET,
      "2017-04-03T11:50:28.538"
    ) as unknown;
    expect(moteStatusTekst(_mote as MoteDTO)).to.deep.equal(
      "Planlegger: Forslag sendt"
    );
  });

  it("Skal returnere riktig status for møte som er BEKREFTET og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.BEKREFTET,
      "2017-04-03T11:35:51.912"
    ) as unknown;
    expect(moteStatusTekst(_mote as MoteDTO)).to.deep.equal(
      "Planlegger: Bekreftelse sendt"
    );
  });

  it("Skal returnere riktig status for møte som er AVBRUTT og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.AVBRUTT,
      "2017-04-03T11:35:51.912"
    ) as unknown;
    expect(moteStatusTekst(_mote as MoteDTO)).to.deep.equal(
      "Planlegger: Avbrutt"
    );
  });
});

describe("moterUtil getMoteRespons", () => {
  it("Skal returnere riktig respons for møte som er opprettet og svar ikke mottatt", () => {
    const _mote = createMote(MoteStatus.OPPRETTET) as unknown;
    expect(getMoteRespons(_mote as MoteDTO)).to.deep.equal("Ingen respons");
  });

  it("Skal returnere riktig respons for møte som er opprettet og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.OPPRETTET,
      "2017-04-03T11:50:28.538"
    ) as unknown;
    expect(getMoteRespons(_mote as MoteDTO)).to.deep.equal("Respons mottatt");
  });

  it("Skal returnere riktig respons for møte som er BEKREFTET og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.BEKREFTET,
      "2017-04-03T11:35:51.912"
    ) as unknown;
    expect(getMoteRespons(_mote as MoteDTO)).to.deep.equal("Respons mottatt");
  });

  it("Skal returnere riktig respons for møte som er AVBRUTT og svar er mottatt", () => {
    const _mote = createMote(
      MoteStatus.AVBRUTT,
      "2017-04-03T11:35:51.912"
    ) as unknown;
    expect(getMoteRespons(_mote as MoteDTO)).to.deep.equal("Respons mottatt");
  });
});

describe("moterUtil compareByMotedato", () => {
  it("Sorterer møter på møtedato eldste først", () => {
    const mote1 = {
      bekreftetAlternativ: {
        tid: "2021-06-26T11:11:00",
      },
      alternativer: [
        {
          tid: "2021-06-23T11:11:00",
        },
        {
          tid: "2021-06-26T11:11:00",
        },
      ],
    } as unknown;
    const mote2 = {
      alternativer: [
        {
          tid: "2021-06-21T11:11:00",
        },
        {
          tid: "2021-06-24T11:11:00",
        },
      ],
    } as unknown;
    const mote3 = {
      alternativer: [
        {
          tid: "2021-06-28T11:11:00",
        },
      ],
    } as unknown;
    const mote4 = {
      bekreftetAlternativ: {
        tid: "2021-06-22T11:11:00",
      },
      alternativer: [
        {
          tid: "2021-06-22T11:11:00",
        },
      ],
    } as unknown;

    const moter = [
      mote1 as MoteDTO,
      mote2 as MoteDTO,
      mote3 as MoteDTO,
      mote4 as MoteDTO,
    ];
    const sorterteMoter = moter.sort(compareByMotedato());
    expect(sorterteMoter.length).to.equal(4);
    expect(sorterteMoter[0]).to.deep.equal(mote2);
    expect(sorterteMoter[1]).to.deep.equal(mote4);
    expect(sorterteMoter[2]).to.deep.equal(mote1);
    expect(sorterteMoter[3]).to.deep.equal(mote3);
  });
});

const createMote = (status: MoteStatus, svarTidspunkt?: string) => {
  return Object.assign(
    {},
    {
      status,
      opprettetTidspunkt: new Date("2017-02-22T15:18:24.323"),
      bekreftetTidspunkt: null,
      deltakere: [
        {
          hendelser: [],
          deltakerUuid: "uuid1",
          navn: "Are Arbeidsgiver",
          orgnummer: "987654321",
          epost: "are.arbeidsgiver@nav.no",
          type: "arbeidsgiver",
          svartidspunkt: svarTidspunkt || null,
          svar: [
            {
              id: 1,
              tid: new Date("2017-03-07T15:18:24.323"),
              created: new Date("2017-02-22T15:18:24.323"),
              sted: "Sannergata 2",
              valgt: false,
            },
            {
              id: 2,
              tid: new Date("2017-03-09T15:18:24.323"),
              created: new Date("2017-02-22T15:18:24.323"),
              sted: "Sannergata 2",
              valgt: false,
            },
          ],
        },
        {
          hendelser: [],
          deltakerUuid: "uuid2",
          navn: "Sygve Sykmeldt",
          orgnummer: null,
          epost: null,
          type: "Bruker",
          svartidspunkt: null,
          svar: [
            {
              id: 1,
              tid: new Date("2017-03-07T15:18:24.323"),
              created: new Date("2017-02-22T15:18:24.323"),
              sted: "Sannergata 2",
              valgt: false,
            },
            {
              id: 2,
              tid: new Date("2017-03-09T15:18:24.323"),
              created: new Date("2017-02-22T15:18:24.323"),
              sted: "Sannergata 2",
              valgt: false,
            },
          ],
        },
      ],
      bekreftetAlternativ: null,
      alternativer: [
        {
          id: 1,
          tid: new Date("2017-03-07T15:18:24.323"),
          created: new Date("2017-02-22T15:18:24.323"),
          sted: "Sannergata 2",
          valgt: false,
        },
        {
          id: 2,
          tid: new Date("2017-02-25T15:18:24.323"),
          created: new Date("2017-02-22T15:18:24.323"),
          sted: "Sannergata 2",
          valgt: false,
        },
      ],
    }
  );
};

const getMoteMedEttSvar = () => {
  return Object.assign(
    {},
    {
      moteUuid: "moteuuid",
      opprettetAv: "L122481",
      status: "OPPRETTET",
      opprettetTidspunkt: "2017-03-31T11:50:28.538",
      sistEndret: "2017-04-04T11:50:28.538",
      navEnhet: "00020",
      deltakere: [
        {
          hendelser: [],
          deltakerUuid: "uuid1",
          navn: "Are Arbeidsgiver",
          orgnummer: "987654321",
          epost: "test@nav.no",
          type: "arbeidsgiver",
          svartidspunkt: "2017-04-03T11:50:28.538",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:50:28.538",
              created: "2017-03-31T11:50:28.538",
              sted: "Sannergata",
              valgt: false,
            },
            {
              id: 2,
              tid: "2017-04-18T11:50:28.538",
              created: "2017-03-31T11:50:28.538",
              sted: "Sannergata",
              valgt: false,
            },
          ],
          virksomhet: "Fant ikke navn",
        },
        {
          hendelser: [],
          deltakerUuid: "uuid2",
          navn: "Terje Testbruker",
          fnr: "12345678901",
          epost: "terje@nav.no",
          type: "Bruker",
          svartidspunkt: "2017-04-05T11:50:28.538",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:50:28.538",
              created: "2017-03-31T11:50:28.538",
              sted: "Sannergata",
              valgt: true,
            },
            {
              id: 2,
              tid: "2017-04-18T11:50:28.538",
              created: "2017-03-31T11:50:28.538",
              sted: "Sannergata",
              valgt: false,
            },
          ],
        },
      ],
      alternativer: [
        {
          id: 1,
          tid: "2017-04-16T11:50:28.538",
          created: "2017-03-31T11:50:28.538",
          sted: "Sannergata",
          valgt: false,
        },
        {
          id: 2,
          tid: "2017-04-18T11:50:28.538",
          created: "2017-03-31T11:50:28.538",
          sted: "Sannergata",
          valgt: false,
        },
      ],
    }
  );
};

const getMoteMedBeggeSvar = () => {
  return Object.assign(
    {},
    {
      moteUuid: "moteuuid",
      opprettetAv: "L122481",
      status: "OPPRETTET",
      opprettetTidspunkt: "2017-03-31T11:43:41.533",
      sistEndret: "2017-03-31T11:43:41.533",
      navEnhet: "00020",
      deltakere: [
        {
          hendelser: [],
          deltakerUuid: "uuid1",
          navn: "Are Arbeidsgiver",
          orgnummer: "987654321",
          epost: "test@nav.no",
          type: "arbeidsgiver",
          svartidspunkt: "2017-04-03T11:43:41.533",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
            {
              id: 2,
              tid: "2017-04-18T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: false,
            },
          ],
          virksomhet: "Fant ikke navn",
        },
        {
          hendelser: [],
          deltakerUuid: "uuid2",
          navn: "Terje Testbruker",
          fnr: "12345678901",
          epost: "terje@nav.no",
          type: "Bruker",
          svartidspunkt: "2017-04-05T11:43:41.533",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: false,
            },
            {
              id: 2,
              tid: "2017-04-18T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
          ],
        },
      ],
      alternativer: [
        {
          id: 1,
          tid: "2017-04-16T11:43:41.533",
          created: "2017-03-31T11:43:41.533",
          sted: "Sannergata",
          valgt: false,
        },
        {
          id: 2,
          tid: "2017-04-18T11:43:41.533",
          created: "2017-03-31T11:43:41.533",
          sted: "Sannergata",
          valgt: false,
        },
      ],
    }
  );
};

const getMoteMedBeggeSvarBeggeAlternativer = () => {
  return Object.assign(
    {},
    {
      moteUuid: "moteuuid",
      opprettetAv: "L122481",
      status: "OPPRETTET",
      opprettetTidspunkt: "2017-03-31T11:43:41.533",
      sistEndret: "2017-03-31T11:43:41.533",
      navEnhet: "00020",
      deltakere: [
        {
          hendelser: [],
          deltakerUuid: "uuid1",
          navn: "Are Arbeidsgiver",
          orgnummer: "987654321",
          epost: "test@nav.no",
          type: "arbeidsgiver",
          svartidspunkt: "2017-04-03T11:43:41.533",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
            {
              id: 2,
              tid: "2017-04-18T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
          ],
          virksomhet: "Fant ikke navn",
        },
        {
          hendelser: [],
          deltakerUuid: "uuid2",
          navn: "Terje Testbruker",
          fnr: "12345678901",
          epost: "terje@nav.no",
          type: "Bruker",
          svartidspunkt: "2017-04-05T11:43:41.533",
          svar: [
            {
              id: 1,
              tid: "2017-04-16T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
            {
              id: 2,
              tid: "2017-04-18T11:43:41.533",
              created: "2017-03-31T11:43:41.533",
              sted: "Sannergata",
              valgt: true,
            },
          ],
        },
      ],
      alternativer: [
        {
          id: 1,
          tid: "2017-04-16T11:43:41.533",
          created: "2017-03-31T11:43:41.533",
          sted: "Sannergata",
          valgt: false,
        },
        {
          id: 2,
          tid: "2017-04-18T11:43:41.533",
          created: "2017-03-31T11:43:41.533",
          sted: "Sannergata",
          valgt: false,
        },
      ],
    }
  );
};
