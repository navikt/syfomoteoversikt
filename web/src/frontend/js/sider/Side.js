import React, { PropTypes } from 'react';
const DocumentTitle = require('react-document-title');

const Side = ({ tittel = '', children }) => {
    return (<DocumentTitle title='Møteoversikt'>
        <div className="container">
            <div>
                {children}
            </div>
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
};

export default Side;
