import React, { Component, PropTypes } from 'react';
import { statuser, deltakerSvarStatus } from '../utils/Statuser';
import MoteEnhet from './MoteEnhet';

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
        const { moter, hentBruker } = this.props;


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
                <h3 className="moteoversikt__meta">
                    Viser {filtrerteMoter.length} {filtrerteMoter.length === 1 ? 'møte' : 'møter'}</h3>
                <table className="motetabell">
                    <thead>
                    <tr>
                        <th scope="col">Velg</th>
                        <th scope="col">Veileder</th>
                        <th scope="col">Sykemeldt</th>
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
                        return <MoteEnhet hentBruker={hentBruker} key={index} {...mote} eier={eier} bruker={bruker} svarStatus={svarStatus} />;
                    })}
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

Moteoversikt.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
};

export default Moteoversikt;
