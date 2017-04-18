import React, { PropTypes } from 'react';
import MoteoversiktEnhet from './MoteoversiktEnhet';
import { setMoteStatus } from '../utils/statuser';

const Moter = ({ moter, hentVirksomhet, hentBruker, markerMoteForOverforing }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });

    return (<div>
        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Enheten har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <MoteoversiktEnhet markerMoteForOverforing={markerMoteForOverforing} hentBruker={hentBruker} hentVirksomhet={hentVirksomhet} moter={moterMedStatus} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    visMoter: PropTypes.func,
    visMoterEnhet: PropTypes.func,
    side: PropTypes.string,
};

export default Moter;
