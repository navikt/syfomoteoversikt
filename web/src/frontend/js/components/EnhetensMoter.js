import React, { PropTypes } from 'react';
import MoteoversiktEnhet from './MoteoversiktEnhet';
import { setMoteStatus } from '../utils/statuser';
import { Varselstripe } from 'digisyfo-npm';

const Moter = ({ props }) => {
    const { moter, overtaMoterFeilet } = props;
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });
    return (<div>
        {overtaMoterFeilet && <div className="blokk panel"><Varselstripe type="feil">
            <div>
            <p>Det skjedde en feil så du ikke fikk overtatt møtene</p>
            <label>Prøv igjen senere</label>
            </div>
        </Varselstripe></div>}
        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Enheten har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <MoteoversiktEnhet {...props} moter={moterMedStatus} />
        }
    </div>);
};

Moter.propTypes = {
    props: PropTypes.object,
    moter: PropTypes.array,
    overtaMoterFeilet: PropTypes.bool,
};

export default Moter;
