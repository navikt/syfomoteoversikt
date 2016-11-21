import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../actions/moter_actions';

export class MoteSide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { henter, hentMoterFeiletBool, mote } = this.props;
        return (<Side tittel="Møteoversikt">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (mote) {
                        return <p>Her kommer mer</p>;
                    }
                    return <p>Her kommer mer</p>;
                })()
            }
        </Side>);
    }
}

MoteSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    hentMoter: PropTypes.func,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
};

export const mapStateToProps = (state) => {

    return {
        henter: state.moter.henter,
        sender: state.moter.sender,
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions))(MoteSide);

export default MoteContainer;
