import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu, finnVirksomhet, finnNavn } from '../utils/index';

const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Bekreftet',
    OPPRETTET: 'Opprettet',
    SVAR_MOTTATT: 'Svar mottatt',
};

export const erSvarMottatt = (mote) => {
    let svar = mote.deltakere.map((deltaker) => {
        return deltaker.svar;
    });
    svar = [].concat.apply([], svar);
    const mottatteSvar = svar.filter((s) => {
        return s.valgt;
    });
    let mottatteAvvik = mote.deltakere.map((deltaker) => {
        return deltaker.avvik;
    });
    mottatteAvvik = [].concat.apply([], mottatteAvvik);
    return mottatteSvar.length > 0 || mottatteAvvik.length > 0;
};

export const setMoteStatus = (mote) => {
    if (mote.status === 'BEKREFTET' || mote.status === 'AVBRUTT') {
        return mote;
    }
    const svarMottatt = erSvarMottatt(mote);
    if (svarMottatt) {
        return Object.assign({}, mote, {
            status: 'SVAR_MOTTATT',
        });
    }
    return mote;
};
class Mote extends Component {

    componentDidMount() {
        const { leder, hentVirksomhet, moteUuid, bruker, hentBruker } = this.props;
        if (!leder.virksomhet && leder.orgnummer) {
            hentVirksomhet(leder.orgnummer, moteUuid);
        }

        if (!bruker.navn && bruker.fnr) {
            hentBruker(bruker.fnr, moteUuid);
        }
    }
    render() {
        const { status, opprettetTidspunkt, leder, bruker } = this.props;

        return (<tr>
            <td>
                {bruker && bruker.fnr ? bruker.fnr : 'Ukjent fnr'}
            </td>
            <td>
                {finnNavn(bruker)}
            </td>
            <td>
                {leder && leder.navn ? leder.navn : 'Ukjent'}
            </td>
            <td>
                {finnVirksomhet(leder)}
            </td>
            <td>
                {getDatoFraZulu(opprettetTidspunkt)}
            </td>
            <td className={`${status.toLowerCase()}`}>
                {statuser[status]}
            </td>
        </tr>);
    }
}

Mote.propTypes = {
    status: PropTypes.string,
    opprettetTidspunkt: PropTypes.string,
    leder: PropTypes.object,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    moteUuid: PropTypes.string,
    bruker: PropTypes.object,
};

const Moteoversikt = ({ moter, hentVirksomhet, hentBruker }) => {
    return (<div className="moteoversikt">
            <h3 className="moteoversikt__meta">Viser {moter.length} {moter.length === 1 ? 'møte' : 'møter'}</h3>
            <table className="motetabell">
            <thead>
                <tr>
                    <th>F.nr</th>
                    <th>Navn</th>
                    <th>Nærmeste leder</th>
                    <th>Virksomhet</th>
                    <th>Sendt dato</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {moter.sort((a, b) => {
                    if (a.opprettetTidspunkt > b.opprettetTidspunkt) {
                        return -1;
                    }
                    if (a.opprettetTidspunkt < b.opprettetTidspunkt) {
                        return 1;
                    }
                    return 0;
                }).map((mote, index) => {
                    const bruker = mote.deltakere.filter((deltaker) => {
                        return deltaker.type.toUpperCase() === 'BRUKER';
                    })[0];
                    const leder = mote.deltakere.filter((deltaker) => {
                        return deltaker.type.toUpperCase() === 'ARBEIDSGIVER';
                    })[0];
                    return <Mote hentVirksomhet={hentVirksomhet} hentBruker={hentBruker} key={index} {...mote} leder={leder} bruker={bruker} />;
                })}
            </tbody>
        </table>
    </div>);
};

Moteoversikt.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
};

const Moter = ({ veileder, moter, hentVirksomhet, hentBruker }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });
    return (<div>
        <header className="veileder">
            <h2 className="veileder__navn">{veileder.navn}</h2>
        </header>
        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Du har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <Moteoversikt hentBruker={hentBruker} hentVirksomhet={hentVirksomhet} moter={moterMedStatus} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
    veileder: PropTypes.object,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
};

export default Moter;
