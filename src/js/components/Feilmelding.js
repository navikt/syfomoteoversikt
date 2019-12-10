import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

const Feilmelding = ({ tittel = 'Beklager, det oppstod en feil', melding = 'Vennligst prøv igjen litt senere.' }) => {
    return (<Panel className="feilmelding">
        <Undertittel>{tittel}</Undertittel>
        <p>{melding}</p>
    </Panel>);
};

Feilmelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.string,
};

export default Feilmelding;
