import React, { PropTypes } from 'react';
import { getDatoFraZulu } from '../utils/index';

const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Ikke svart',
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

const Mote = ({ status, opprettetTidspunkt, leder, bruker }) => {
    return (<tr>
        <td>
            {bruker && bruker.fnr ? <a href={`/sykefravaer/${bruker.fnr}/mote`}>{bruker.fnr}</a> : 'Ukjent fnr'}
        </td>
        <td>
            {bruker && bruker.navn ? <a href={`/sykefravaer/${bruker.fnr}/mote`}>{bruker.navn}</a> : 'Ukjent navn'}
        </td>
        <td>
            {leder && leder.navn ? leder.navn : 'Ukjent'}
        </td>
        <td>
            {getDatoFraZulu(opprettetTidspunkt)}
        </td>
        <td className={`motestatus--${status.toLowerCase()}`}>
            {statuser[status]}
        </td>
    </tr>);
};

Mote.propTypes = {
    status: PropTypes.string,
    opprettetTidspunkt: PropTypes.string,
    leder: PropTypes.object,
    bruker: PropTypes.object,
};

const Moteoversikt = ({ moter }) => {
    return (<div className="moteoversikt">
            <h3 className="moteoversikt__meta">Viser {moter.length} {moter.length === 1 ? 'møte' : 'møter'}</h3>
            <table className="motetabell">
            <thead>
                <tr>
                    <th>F.nr</th>
                    <th>Navn</th>
                    <th>Nærmeste leder</th>
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
                    return <Mote key={index} {...mote} leder={leder} bruker={bruker} />;
                })}
            </tbody>
        </table>
    </div>);
};

Moteoversikt.propTypes = {
    moter: PropTypes.array,
};

const Moter = ({ veileder, moter }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });
    return (<div>
        <header className="veileder">
            <h2 className="veileder__navn">{veileder.navn} ({moterMedStatus.length})</h2>
        </header>
        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Du har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <Moteoversikt moter={moter} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
    veileder: PropTypes.object,
};

export default Moter;
