import React, { Component, PropTypes } from 'react';
import { statuser, deltakerSvarStatus } from '../utils/statuser';
import { finnVeilederNavn } from '../utils/index';

import MoteEnhet from './MoteEnhet';

class Moteoversikt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterStatus: 'alle',
            filterVeileder: 'alle',
        };
    }

    getStatuser(moter) {
        const alleStatuser = moter.map((mote) => {
            return mote.status;
        });
        return [...new Set(alleStatuser)];
    }

    getVeiledere(moter) {
        const alleVeiledere = moter.map((mote) => {
            return finnVeilederNavn(mote.veileder);
        });
        return [...new Set(alleVeiledere)];
    }

    getFiltrerteMoter() {
        const { moter } = this.props;
        const filterStatus = this.state.filterStatus;
        const filterVeileder = this.state.filterVeileder;
        if (filterStatus === 'alle' && filterVeileder === 'alle') {
            return moter;
        }
        return moter.filter((mote) => {
            let status = true;
            let veileder = true;
            if (filterStatus !== 'alle') {
                status = mote.status === filterStatus;
            }
            if (filterVeileder !== 'alle') {
                veileder = finnVeilederNavn(mote.veileder) === filterVeileder;
            }
            return veileder && status;
        });
    }

    setStatus(status) {
        this.setState({
            filterStatus: status,
        });
    }

    setVeileder(veileder) {
        this.setState({
            filterVeileder: veileder,
        });
    }

    render() {
        const filtrerteMoter = this.getFiltrerteMoter();
        const { moter, hentBruker, markerMoteForOverforing, overforMoter, moterMarkertForOverforing, overtarMoter, hentVeileder } = this.props;

        return (<div>
            <div className="verktoylinje">
                <div className="verktoylinje__verktoy">
                    <div className="verktoylinje__filter">
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
                    <div className="verktoylinje__filter">
                        <label htmlFor="moteoversikt-filtrer">Filtrer på veileder</label>
                        <div className="selectContainer">
                            <select id="moteoversikt-filtrer" onChange={(e) => {
                                this.setVeileder(e.currentTarget.value);
                            }}>
                                <option value="alle">Vis alle</option>
                                {
                                    this.getVeiledere(moter).map((veileder, index) => {
                                        return <option key={index} value={veileder}>{veileder}</option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="moteoversikt">
                <h3 className="moteoversikt__meta">
                    Viser {filtrerteMoter.length} {filtrerteMoter.length === 1 ? 'møte' : 'møter'}</h3>
                <table className="motetabell">
                    <thead>
                    <tr>
                        <th scope="col">Velg</th>
                        <th scope="col">Veileder</th>
                        <th scope="col">Sykmeldt</th>
                        <th scope="col">F.nr</th>
                        <th scope="col">Sendt dato</th>
                        <th scope="col">Status</th>
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
                        const eier = mote.eier;
                        const svarStatus = deltakerSvarStatus(mote);
                        return (<MoteEnhet markerMoteForOverforing={markerMoteForOverforing} hentVeileder={hentVeileder} hentBruker={hentBruker}
                            key={index} {...mote} eier={eier} bruker={bruker} svarStatus={svarStatus} />);
                    })}
                    </tbody>
                </table>
                <div className="knapperad">
                    <button className="knapp" disabled={overtarMoter || moterMarkertForOverforing.length === 0} onClick={() => {
                        overforMoter({
                            moteUuidListe: moterMarkertForOverforing,
                        }); }}>Overta møter</button>
                </div>
            </div>
        </div>);
    }
}

Moteoversikt.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    overforMoter: PropTypes.func,
    hentVeileder: PropTypes.func,
    overtarMoter: PropTypes.bool,
    markerMoteForOverforing: PropTypes.func,
    moterMarkertForOverforing: PropTypes.array,
    hentBruker: PropTypes.func,
};

export default Moteoversikt;
