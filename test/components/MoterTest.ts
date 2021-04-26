import chai from "chai";
import { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import { setMoteStatus } from "../../src/utils/moterUtil";
import { MoteDTO } from "../../src/data/moter/moterTypes";

chai.use(chaiEnzyme());

describe("Moter", () => {
  describe("setMoteStatus", () => {
    it("Skal returnere riktig status for møte som er opprettet og svar ikke mottatt", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "OPPRETTET",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svartidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: true,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("OPPRETTET");
    });

    it("Skal returnere riktig status for møte som er opprettet og svar er mottatt (tidspunkt valgt)", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "OPPRETTET",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svartidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: true,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("SVAR_MOTTATT");
    });

    it("Skal returnere riktig status for møte som er BEKREFTET og svar er mottatt (tidspunkt valgt)", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "BEKREFTET",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svarttidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: true,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("BEKREFTET");
    });

    it("Skal returnere riktig status for møte som er BEKREFTET og svar er mottatt", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "BEKREFTET",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svarttidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("BEKREFTET");
    });

    it("Skal returnere riktig status for møte som er AVBRUTT og svar er mottatt (tidspunkt valgt)", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "AVBRUTT",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svarttidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: true,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("AVBRUTT");
    });

    it("Skal returnere riktig status for møte som er AVBRUTT og svar er mottatt", () => {
      const _mote = {
        id: 0,
        moteUuid: "3d7286c6-fb16-4638-94bc-abaa196dc1f8",
        opprettetAv: "Z990562",
        status: "AVBRUTT",
        opprettetTidspunkt: "2016-11-23T09:28:27.394Z",
        navEnhet: "navEnhet",
        deltakere: [
          {
            deltakerUuid: "94cda1ad-c27d-4186-92a4-54c7a4213f70",
            navn: "Fox Mulder",
            epost: "fox.mulder@fbi.no",
            type: "arbeidsgiver",
            svarttidspunkt: "2016-11-22T14:34:43.231Z",
            svar: [
              {
                id: 349,
                tid: "2022-12-12T11:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
              {
                id: 348,
                tid: "2020-09-09T07:00:00Z",
                sted: "Oslo",
                valgt: false,
              },
            ],
          },
        ],
        alternativer: [
          {
            id: 349,
            tid: "2022-12-12T11:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
          {
            id: 348,
            tid: "2020-09-09T07:00:00Z",
            sted: "Oslo",
            valgt: false,
          },
        ],
      };
      const mote = setMoteStatus((_mote as unknown) as MoteDTO);
      expect(mote.status).to.deep.equal("AVBRUTT");
    });
  });
});