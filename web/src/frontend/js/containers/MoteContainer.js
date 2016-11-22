import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/Moter';
import * as moterActions from '../actions/moter_actions';


export class MoteSide extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { henter, hentMoterFeiletBool, moter } = this.props;
        return (<Side tittel="Møteoversikt">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moter) {
                        return <Moter moter={moter} />;
                    }
                    return <p>Bruker har ingen møter</p>;
                })()
            }
        </Side>);
    }
}

MoteSide.propTypes = {
    moter: PropTypes.array,
    hentMoter: PropTypes.func,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    return {
        henter: state.moter.henter,
        moter: state.moter.data
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions))(MoteSide);

export default MoteContainer;
