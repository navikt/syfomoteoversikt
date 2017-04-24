import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/DineMoter';
import NavigasjonsTopp from '../components/NavigasjonsTopp';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as moterActions from '../actions/moter_actions';
import * as brukerActions from '../actions/bruker_actions';

export class Moteside extends Component {
    constructor(props) {
        super(props);
        if (props.harOvertattMoter || (!props.henterMoterBool && !props.hentMoterFeiletBool && props.moter.length === 0)) {
            props.hentMoter();
        }
    }

    render() {
        const { henterMoterBool, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker, harOvertattMoter, moterMarkertForOverforing, ledetekster } = this.props;

        return (<Side tittel="Møteoversikt">
            <div>
                <NavigasjonsTopp lenker={[
                    {
                        tittel: 'Dine møter',
                        url: '/moteoversikt/dinemoter',
                        aktiv: true,
                    },
                    {
                        tittel: 'Enhetens møter',
                        url: '/moteoversikt/enhetensmoter',
                        aktiv: false,
                    },
                ]} />
            {
                (() => {
                    if (henterMoterBool) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moter) {
                        return (<Moter hentVirksomhet={hentVirksomhet} hentBruker={hentBruker} veileder={veileder} moter={moter}
                            harOvertattMoter={harOvertattMoter} moterMarkertForOverforing={moterMarkertForOverforing} ledetekster={ledetekster} />);
                    }
                    return <p>Bruker har ingen møter</p>;
                })()
            }
            </div>
        </Side>);
    }
}

Moteside.propTypes = {
    moter: PropTypes.array,
    henterVeilederBool: PropTypes.bool,
    henterMoterBool: PropTypes.bool,
    harOvertattMoter: PropTypes.bool,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentMoter: PropTypes.func,
    moterMarkertForOverforing: PropTypes.array,
    hentMoterFeiletBool: PropTypes.bool,
    veileder: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return {
        harOvertattMoter: state.overfor.sendt,
        hentMoterFeiletBool: state.moterEnhet.hentingFeilet || state.ledetekster.hentingFeilet,
        henterMoterBool: state.moterEnhet.henter || state.ledetekster.henter,
        moter: state.moter.data,
        moterMarkertForOverforing: state.overfor.data,
        ledetekster: state.ledetekster.data,
    };
};

const EnhetensMoteContainer = connect(mapStateToProps, Object.assign({}, virksomhetActions, brukerActions, moterActions))(Moteside);

export default EnhetensMoteContainer;
