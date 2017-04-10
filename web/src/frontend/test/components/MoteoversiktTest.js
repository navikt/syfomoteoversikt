import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import {svarStatuser, deltakerSvarStatus} from '../../js/utils/Statuser';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Moteovertsikt deltakerSvarStatus', () =>{

    it('skal vise 0 svar', () => {
        const mote = getMote();
        const svarStatus = deltakerSvarStatus(mote);
        expect(svarStatus).to.equal('0/2 Svar');
    });

    it('skal vise 1 svar', () => {
        const mote = getMoteMedEttSvar();
        const svarStatus = deltakerSvarStatus(mote);
        expect(svarStatus).to.equal('1/2 Svar');
    });

    it('skal vise 2 svar når begge har svart på et alternativ', () => {
        const mote = getMoteMedBeggeSvar();
        const svarStatus = deltakerSvarStatus(mote);
        expect(svarStatus).to.equal('2/2 Svar');
    });

    it('skal vise 2 svar når begge har svart på alle alternativer', () => {
        const mote = getMoteMedBeggeSvarBeggeAlternativer();
        const svarStatus = deltakerSvarStatus(mote);
        expect(svarStatus).to.equal('2/2 Svar');
    });

    it('skal vise bekreftet mote', () => {
        const mote = getMoteBekreftet();
        const svarStatus = deltakerSvarStatus(mote);
        expect(svarStatus).to.equal(svarStatuser.BEKREFTET);
    });

});

const getMote = (mote) => {
    return Object.assign({}, {
        "status": "OPPRETTET",
        "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
        "bekreftetTidspunkt": null,
        "deltakere": [{
            "hendelser": [],
            "deltakerUuid": "uuid1",
            "navn": "Are Arbeidsgiver",
            "orgnummer": "***REMOVED***",
            "epost": "are.arbeidsgiver@nav.no",
            "type": "arbeidsgiver",
            "svartidspunkt": null,
            "svar": [{
                "id": 1,
                "tid": new Date("2017-03-07T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 2,
                "tid": new Date("2017-03-09T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }]
        }, {
            "hendelser": [],
            "deltakerUuid": "uuid2",
            "navn": "Sygve Sykmeldt",
            "orgnummer": null,
            "epost": null,
            "type": "Bruker",
            "svartidspunkt": null,
            "svar": [{
                "id": 1,
                "tid": new Date("2017-03-07T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 2,
                "tid": new Date("2017-03-09T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }]
        }],
        "bekreftetAlternativ": null,
        "alternativer": [{
            "id": 1,
            "tid": new Date("2017-03-07T15:18:24.323"),
            "created": new Date("2017-02-22T15:18:24.323"),
            "sted": "Sannergata 2",
            "valgt": false
        }, {
            "id": 2,
            "tid": new Date("2017-02-25T15:18:24.323"),
            "created": new Date("2017-02-22T15:18:24.323"),
            "sted": "Sannergata 2",
            "valgt": false
        }]
    }, mote);
};

const getMoteMedEttSvar = (mote) => {
    return Object.assign({},   {
        "moteUuid": "moteuuid",
        "opprettetAv": "L122481",
        "status": "OPPRETTET",
        "opprettetTidspunkt": "2017-03-31T11:50:28.538",
        "navEnhet": "00020",
        "deltakere": [
            {
                "hendelser": [],
                "deltakerUuid": "uuid1",
                "navn": "Are Arbeidsgiver",
                "orgnummer": "***REMOVED***",
                "epost": "test@nav.no",
                "type": "arbeidsgiver",
                "svartidspunkt": "2017-04-03T11:50:28.538",
                "svartTidspunkt": "2017-04-03T11:50:28.538",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:50:28.538",
                        "created": "2017-03-31T11:50:28.538",
                        "sted": "Sannergata",
                        "valgt": false
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:50:28.538",
                        "created": "2017-03-31T11:50:28.538",
                        "sted": "Sannergata",
                        "valgt": false
                    }
                ],
                "virksomhet": "Fant ikke navn"
            },
            {
                "hendelser": [],
                "deltakerUuid": "uuid2",
                "navn": "Terje Testbruker",
                "fnr": "***REMOVED***",
                "epost": "terje@nav.no",
                "type": "Bruker",
                "svartidspunkt": "2017-04-05T11:50:28.538",
                "svartTidspunkt": "2017-04-05T11:50:28.538",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:50:28.538",
                        "created": "2017-03-31T11:50:28.538",
                        "sted": "Sannergata",
                        "valgt": true
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:50:28.538",
                        "created": "2017-03-31T11:50:28.538",
                        "sted": "Sannergata",
                        "valgt": false
                    }
                ]
            }
        ],
        "alternativer": [
            {
                "id": 1,
                "tid": "2017-04-16T11:50:28.538",
                "created": "2017-03-31T11:50:28.538",
                "sted": "Sannergata",
                "valgt": false
            },
            {
                "id": 2,
                "tid": "2017-04-18T11:50:28.538",
                "created": "2017-03-31T11:50:28.538",
                "sted": "Sannergata",
                "valgt": false
            }
        ]
    }, mote);
};

const getMoteMedBeggeSvar = (mote) => {
    return Object.assign({},   {
        "moteUuid": "moteuuid",
        "opprettetAv": "L122481",
        "status": "OPPRETTET",
        "opprettetTidspunkt": "2017-03-31T11:43:41.533",
        "navEnhet": "00020",
        "deltakere": [
            {
                "hendelser": [],
                "deltakerUuid": "uuid1",
                "navn": "Are Arbeidsgiver",
                "orgnummer": "***REMOVED***",
                "epost": "test@nav.no",
                "type": "arbeidsgiver",
                "svartidspunkt": "2017-04-03T11:43:41.533",
                "svartTidspunkt": "2017-04-03T11:43:41.533",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": false
                    }
                ],
                "virksomhet": "Fant ikke navn"
            },
            {
                "hendelser": [],
                "deltakerUuid": "uuid2",
                "navn": "Terje Testbruker",
                "fnr": "***REMOVED***",
                "epost": "terje@nav.no",
                "type": "Bruker",
                "svartidspunkt": "2017-04-05T11:43:41.533",
                "svartTidspunkt": "2017-04-05T11:43:41.533",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": false
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    }
                ]
            }
        ],
        "alternativer": [
            {
                "id": 1,
                "tid": "2017-04-16T11:43:41.533",
                "created": "2017-03-31T11:43:41.533",
                "sted": "Sannergata",
                "valgt": false
            },
            {
                "id": 2,
                "tid": "2017-04-18T11:43:41.533",
                "created": "2017-03-31T11:43:41.533",
                "sted": "Sannergata",
                "valgt": false
            }
        ]
    }, mote);
};

const getMoteMedBeggeSvarBeggeAlternativer = (mote) => {
    return Object.assign({},   {
        "moteUuid": "moteuuid",
        "opprettetAv": "L122481",
        "status": "OPPRETTET",
        "opprettetTidspunkt": "2017-03-31T11:43:41.533",
        "navEnhet": "00020",
        "deltakere": [
            {
                "hendelser": [],
                "deltakerUuid": "uuid1",
                "navn": "Are Arbeidsgiver",
                "orgnummer": "***REMOVED***",
                "epost": "test@nav.no",
                "type": "arbeidsgiver",
                "svartidspunkt": "2017-04-03T11:43:41.533",
                "svartTidspunkt": "2017-04-03T11:43:41.533",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    }
                ],
                "virksomhet": "Fant ikke navn"
            },
            {
                "hendelser": [],
                "deltakerUuid": "uuid2",
                "navn": "Terje Testbruker",
                "fnr": "***REMOVED***",
                "epost": "terje@nav.no",
                "type": "Bruker",
                "svartidspunkt": "2017-04-05T11:43:41.533",
                "svartTidspunkt": "2017-04-05T11:43:41.533",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:43:41.533",
                        "created": "2017-03-31T11:43:41.533",
                        "sted": "Sannergata",
                        "valgt": true
                    }
                ]
            }
        ],
        "alternativer": [
            {
                "id": 1,
                "tid": "2017-04-16T11:43:41.533",
                "created": "2017-03-31T11:43:41.533",
                "sted": "Sannergata",
                "valgt": false
            },
            {
                "id": 2,
                "tid": "2017-04-18T11:43:41.533",
                "created": "2017-03-31T11:43:41.533",
                "sted": "Sannergata",
                "valgt": false
            }
        ]
    }, mote);
};

const getMoteBekreftet = (mote) => {
    return Object.assign({},   {
        "moteUuid": "moteuuid",
        "opprettetAv": "L122481",
        "status": "BEKREFTET",
        "opprettetTidspunkt": "2017-03-31T11:35:51.912",
        "bekreftetTidspunkt": "2017-04-09T11:35:51.912",
        "navEnhet": "00020",
        "deltakere": [
            {
                "hendelser": [],
                "deltakerUuid": "uuid1",
                "navn": "Are Arbeidsgiver",
                "orgnummer": "***REMOVED***",
                "epost": "test@nav.no",
                "type": "arbeidsgiver",
                "svartidspunkt": "2017-04-03T11:35:51.912",
                "svartTidspunkt": "2017-04-03T11:35:51.912",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:35:51.912",
                        "created": "2017-03-31T11:35:51.912",
                        "sted": "Sannergata",
                        "valgt": false
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:35:51.912",
                        "created": "2017-03-31T11:35:51.912",
                        "sted": "Sannergata",
                        "valgt": true
                    }
                ],
                "virksomhet": "Fant ikke navn"
            },
            {
                "hendelser": [],
                "deltakerUuid": "uuid2",
                "navn": "Terje Testbruker",
                "fnr": "***REMOVED***",
                "epost": "terje@nav.no",
                "type": "Bruker",
                "svartidspunkt": "2017-04-05T11:35:51.912",
                "svartTidspunkt": "2017-04-05T11:35:51.912",
                "avvik": [],
                "svar": [
                    {
                        "id": 1,
                        "tid": "2017-04-16T11:35:51.912",
                        "created": "2017-03-31T11:35:51.912",
                        "sted": "Sannergata",
                        "valgt": true
                    },
                    {
                        "id": 2,
                        "tid": "2017-04-18T11:35:51.912",
                        "created": "2017-03-31T11:35:51.912",
                        "sted": "Sannergata",
                        "valgt": false
                    }
                ]
            }
        ],
        "bekreftetAlternativ": {
            "id": 1,
            "tid": "2017-04-16T11:35:51.912",
            "created": "2017-03-31T11:35:51.912",
            "sted": "Sannergata",
            "valgt": true
        },
        "valgtAlternativ": {
            "id": 1,
            "tid": "2017-04-16T11:35:51.912",
            "created": "2017-03-31T11:35:51.912",
            "sted": "Sannergata",
            "valgt": true
        },
        "alternativer": [
            {
                "id": 1,
                "tid": "2017-04-16T11:35:51.912",
                "created": "2017-03-31T11:35:51.912",
                "sted": "Sannergata",
                "valgt": false
            },
            {
                "id": 2,
                "tid": "2017-04-18T11:35:51.912",
                "created": "2017-03-31T11:35:51.912",
                "sted": "Sannergata",
                "valgt": false
            }
        ]
    }, mote);
};

