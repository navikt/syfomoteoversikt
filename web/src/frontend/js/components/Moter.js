import React, { PropTypes } from 'react';
import { getDatoFraZulu } from '../utils/index';

const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Bekreftet',
    OPPRETTET: 'Opprettet',
};

const Mote = ({ status, opprettetTidspunkt, leder }) => {
    return (<tr>
        <td>
            Mangler
        </td>
        <td>
            Mangler
        </td>
        <td>
            {leder.navn}
        </td>
        <td>
            {getDatoFraZulu(opprettetTidspunkt)}
        </td>
        <td className={`${status.toLowerCase()}`}>
            {statuser[status]}
        </td>
    </tr>);
};

Mote.propTypes = {
    status: PropTypes.string,
    opprettetTidspunkt: PropTypes.string,
    leder: PropTypes.string,
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
                    const leder = mote.deltakere.filter((deltaker) => {
                        return deltaker.type === 'arbeidsgiver';
                    })[0];
                    return <Mote key={index} {...mote} leder={leder} />;
                })}
            </tbody>
        </table>
    </div>);
};

Moteoversikt.propTypes = {
    moter: PropTypes.array,
};

const Moter = ({ moter }) => {
    return (<div>
        <header className="veileder">
            <h2 className="veileder__navn">BERIT STENERSEN</h2>
        </header>
        {
            moter.length === 0 && (<div className="panel">
                <p>Du har ingen møter.</p>
            </div>)
        }
        {
            moter.length > 0 && <Moteoversikt moter={moter} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
};

export default Moter;
