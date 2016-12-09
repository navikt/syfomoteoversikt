import React, { Component, PropTypes } from 'react';
import { getDatoFraZulu, finnVirksomhet, finnNavn } from '../utils/index';
import { statuser } from '../utils/Statuser';

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
                {bruker && bruker.fnr ? <a href={`/sykefravaer/${bruker.fnr}/mote`}>{bruker.fnr}</a> : 'Ukjent fnr'}
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
                <span className={`motestatus motestatus--${status.toLowerCase()}`}>
                    <img src={`/moteoversikt/img/svg/status_${status.toLowerCase()}.svg`} alt="" />
                    <span>{statuser[status]}</span>
                </span>
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

export default Mote;
