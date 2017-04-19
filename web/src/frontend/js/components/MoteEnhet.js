import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu, finnNavn } from '../utils/index';

class MoteEnhet extends Component {

    componentDidMount() {
        const { moteUuid, bruker, hentBruker } = this.props;


        if (!bruker.navn && bruker.fnr) {
            hentBruker(bruker.fnr, moteUuid);
        }
    }

    render() {
        const { opprettetTidspunkt, eier, bruker, markert, svarStatus, moteUuid, markerMoteForOverforing } = this.props;
        return (<tr>
            <td>
                <input type="checkbox" checked={markert} onChange={ (e) => {
                    markerMoteForOverforing(moteUuid, e.target.checked);
                } } />
            </td>
            <td>
                {eier}
            </td>
            <td>
                {finnNavn(bruker)}
            </td>
            <td>
                {bruker && bruker.fnr ? bruker.fnr : 'Ukjent fnr'}
            </td>
            <td>
                {getDatoFraZulu(opprettetTidspunkt)}
            </td>
            <td>
                <span className="Motestatus">
                    <span>{svarStatus}</span>
                </span>
            </td>
        </tr>);
    }
}

MoteEnhet.propTypes = {
    opprettetTidspunkt: PropTypes.string,
    hentBruker: PropTypes.func,
    moteUuid: PropTypes.string,
    bruker: PropTypes.object,
    markerMoteForOverforing: PropTypes.func,
    svarStatus: PropTypes.string,
    markert: PropTypes.bool,
    eier: PropTypes.string,
};

export default MoteEnhet;
