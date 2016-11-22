import React, { PropTypes } from 'react';
import { getDatoFraZulu } from '../utils/index';

const Mote = ({ status, opprettetTidspunkt }) => {
    return (<div>
        <p>{status} - {getDatoFraZulu(opprettetTidspunkt)}</p>
    </div>);
};

Mote.propTypes = {
    status: PropTypes.string,
    opprettetTidspunkt: PropTypes.string,
};

const Moter = ({ moter = [] }) => {

    return (<div className="panel">
        <div>
            {
                moter.length === 0 && <p>Brukeren har ingen møter.</p>
            }
            {
                moter.length > 0 && moter.map((mote, index) => {
                    return (<Mote {...mote} key={index} />);
                })
            }
        </div>
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
};

export default Moter;
