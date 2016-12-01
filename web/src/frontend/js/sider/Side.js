import React, { PropTypes } from 'react';
const DocumentTitle = require('react-document-title');

const Side = ({ tittel = '', children }) => {
    return (<DocumentTitle title={tittel}>
        <div className="container">
            {children}
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
};

export default Side;
