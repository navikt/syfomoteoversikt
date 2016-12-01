import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/Moter';
import * as moterActions from '../actions/moter_actions';

const Moteside = ({ henter, hentMoterFeiletBool, moter }) => {
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
};

Moteside.propTypes = {
    moter: PropTypes.array,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    return {
        hentMoterFeiletBool: state.moter.hentingFeilet,
        henter: state.moter.henter,
        moter: state.moter.data,
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions))(Moteside);

export default MoteContainer;
