import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu, finnVirksomhet, finnNavn } from '../utils/index';

class Mote extends Component {

    componentDidMount() {
        const { leder, hentVirksomhet, hentFnr, moteUuid, bruker, hentBruker, aktorId } = this.props;
        if (!leder.virksomhet && leder.orgnummer) {
            hentVirksomhet(leder.orgnummer, moteUuid);
        }
        if (!bruker.navn && aktorId) {
            hentBruker(aktorId, moteUuid);
        }

        if (!bruker.fnr && aktorId) {
            hentFnr(aktorId, moteUuid);
        }
    }

    render() {
        const { opprettetTidspunkt, leder, bruker, svarStatus } = this.props;
        return (<tr>
            <td>
                {bruker && bruker.fnr}
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
            <td>
                <span className="Motestatus">
                    <span>{svarStatus}</span>
                </span>
            </td>
        </tr>);
    }
}

Mote.propTypes = {
    opprettetTidspunkt: PropTypes.string,
    leder: PropTypes.object,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentFnr: PropTypes.func,
    aktorId: PropTypes.string,
    moteUuid: PropTypes.string,
    bruker: PropTypes.object,
    svarStatus: PropTypes.string,
};

export default Mote;
