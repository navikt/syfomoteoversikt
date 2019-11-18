import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import { getDatoFraZulu, finnNavn, finnVeilederNavn } from '../utils/index';

class MoteEnhet extends Component {
    componentDidMount() {
        const { moteUuid, bruker, hentBruker, hentFnr, hentVeileder, eier, veileder, aktorId } = this.props;
        if (!bruker.navn && aktorId) {
            hentBruker(aktorId, moteUuid);
        }
        if (!bruker.fnr && aktorId) {
            hentFnr(aktorId, moteUuid);
        }
        if (!veileder && eier) {
            hentVeileder({ ident: eier });
        }
    }

    render() {
        const { bruker, markert, svarStatus, moteUuid, markerMoteForOverforing, veileder, sistEndret } = this.props;
        return (<tr>
            <td>
                <Checkbox
                    id={moteUuid}
                    checked={markert}
                    onChange={(e) => {
                        markerMoteForOverforing(moteUuid, e.target.checked);
                    }}
                />
                <label htmlFor={moteUuid} />
            </td>
            <td>
                {finnVeilederNavn(veileder)}
            </td>
            <td>
                {finnNavn(bruker)}
            </td>
            <td>
                {bruker && bruker.fnr}
            </td>
            <td>
                {getDatoFraZulu(sistEndret)}
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
    aktorId: PropTypes.string,
    hentFnr: PropTypes.func,
    hentBruker: PropTypes.func,
    hentVeileder: PropTypes.func,
    moteUuid: PropTypes.string,
    veileder: PropTypes.object,
    bruker: PropTypes.object,
    markerMoteForOverforing: PropTypes.func,
    eier: PropTypes.string,
    svarStatus: PropTypes.string,
    markert: PropTypes.bool,
    sistEndret: PropTypes.string,
};

export default MoteEnhet;
