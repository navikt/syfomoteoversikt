import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu, finnNavn, finnVeilederNavn } from '../utils/index';

class MoteEnhet extends Component {

    componentDidMount() {
        const { moteUuid, bruker, hentBruker, hentVeileder, eier, veileder } = this.props;
        if (!bruker.navn && bruker.fnr) {
            hentBruker(bruker.fnr, moteUuid);
        }
        if (!veileder && eier) {
            hentVeileder({ ident: eier });
        }
    }

    render() {
        const { opprettetTidspunkt, bruker, markert, svarStatus, moteUuid, markerMoteForOverforing, veileder } = this.props;
        return (<tr>
            <td>
                <input type="checkbox" id={moteUuid} className="checkboks" checked={markert} onChange={ (e) => {
                    markerMoteForOverforing(moteUuid, e.target.checked);
                } } />
                <label htmlFor={moteUuid} />
            </td>
            <td>
                {finnVeilederNavn(veileder)}
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
    hentVeileder: PropTypes.func,
    moteUuid: PropTypes.string,
    veileder: PropTypes.object,
    bruker: PropTypes.object,
    markerMoteForOverforing: PropTypes.func,
    eier: PropTypes.string,
    svarStatus: PropTypes.string,
    markert: PropTypes.bool,
    veiledernavn: PropTypes.string,
};

export default MoteEnhet;
