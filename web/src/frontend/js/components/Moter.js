import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu } from '../utils/index';

const statuser = {
    AVBRUTT: 'Avbrutt',
    BEKREFTET: 'Møtetidspunkt bekreftet',
    OPPRETTET: 'Ikke svart',
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
        <td>
            <span className={`motestatus motestatus--${status.toLowerCase()}`}>
                <img src={`/moteoversikt/img/svg/status_${status.toLowerCase()}.svg`} />
                <span>{statuser[status]}</span>
            </span>
        </td>
    </tr>);
};

Mote.propTypes = {
    status: PropTypes.string,
    opprettetTidspunkt: PropTypes.string,
    leder: PropTypes.object,
    bruker: PropTypes.object,
};

class Moteoversikt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'alle',
        };
    }

    getStatuser(moter) {
        const alleStatuser = moter.map((mote) => {
            return mote.status;
        });
        return [...new Set(alleStatuser)];
    }

    getFiltrerteMoter() {
        const { moter } = this.props;
        const filter = this.state.filter;
        if (filter === 'alle') {
            return moter;
        }
        return moter.filter((mote) => {
            return mote.status === filter;
        });
    }

    setStatus(status) {
        this.setState({
            filter: status,
        });
    }

    render() {
        const filtrerteMoter = this.getFiltrerteMoter();
        const { moter } = this.props;
        return (<div>
            <div className="verktoylinje">
                <div className="verktoylinje__verktoy">
                    <label htmlFor="moteoversikt-filtrer">Filtrer på status</label>
                    <div className="selectContainer">
                        <select id="moteoversikt-filtrer" onChange={(e) => {
                            this.setStatus(e.currentTarget.value);
                        }}>
                            <option value="alle">Vis alle</option>
                            {
                                this.getStatuser(moter).map((status, index) => {
                                    return <option key={index} value={status}>{statuser[status]}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="moteoversikt">
                <h3 className="moteoversikt__meta">Viser {filtrerteMoter.length} {filtrerteMoter.length === 1 ? 'møte' : 'møter'}</h3>
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
                    {filtrerteMoter.sort((a, b) => {
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
        </div>
    </div>);
    }
}

Moteoversikt.propTypes = {
    moter: PropTypes.array,
};

const Moter = ({ moter }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });

    return (<div>
        <header className="navigasjon">
            <h2 className="navigasjon__element navigasjon__element--dine">Dine møter</h2>
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
};

export default Moter;
