import React, { PropTypes } from 'react';

const Sidetopp = ({ tittel }) => {
    return (<header className="sidetopp js-sidetopp">
        <h3 className="sidetopp__tittel">{tittel}</h3>
    </header>);
};

Sidetopp.propTypes = {
    tittel: PropTypes.string,
};

export default Sidetopp;
