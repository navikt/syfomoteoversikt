import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigasjonsTopp = ({ lenker }) => {
    return (<header className="navigasjon">
        {
            lenker.map((lenke) => {
                return (<h2 className="navigasjon__element" key={lenke.url}>
                    <div className={`navigasjon__element__inner${lenke.aktiv ? '--active' : ''}`}>
                        <Link className="lenke" to={lenke.url} >{lenke.tittel}</Link>
                    </div>
                </h2>);
            })
        }
    </header>);
};

NavigasjonsTopp.propTypes = {
    lenker: PropTypes.array,
};


export default NavigasjonsTopp;
