import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/Moter';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as moterActions from '../actions/moter_actions';
import * as brukerActions from '../actions/bruker_actions';

const Moteside = ({ henter, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker }) => {
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
                    return <Moter hentVirksomhet={hentVirksomhet} hentBruker={hentBruker} veileder={veileder} moter={moter} />;
                }
                return <p>Bruker har ingen møter</p>;
            })()
        }
    </Side>);
};

Moteside.propTypes = {
    moter: PropTypes.array,
    henter: PropTypes.bool,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentMoterFeiletBool: PropTypes.bool,
    veileder: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return {
        hentMoterFeiletBool: state.moter.hentingFeilet,
        henter: state.moter.henter || state.veileder.henter,
        moter: state.moter.data,
        veileder: state.veileder.data,
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, virksomhetActions, brukerActions))(Moteside);

export default MoteContainer;
