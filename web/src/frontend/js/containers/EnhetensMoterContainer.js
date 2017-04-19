import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import NavigasjonsTopp from '../components/NavigasjonsTopp';
import AppSpinner from '../components/AppSpinner';
import EnhetensMoter from '../components/EnhetensMoter';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as brukerActions from '../actions/bruker_actions';
import * as moterEnhetActions from '../actions/moterEnhet_actions';
import * as moterActions from '../actions/moter_actions';

export class Moteside extends Component {
    constructor(props) {
        super(props);
        if (props.aktivEnhet !== props.hentetEnhet) {
            props.hentEnhetsMoter(props.aktivEnhet);
        }
        props.resetOverforing();
    }

    componentDidUpdate() {
        const { aktivEnhet, hentEnhetsMoter, hentetEnhet } = this.props;
        if (hentetEnhet !== aktivEnhet) {
            hentEnhetsMoter(aktivEnhet);
        }
    }

    render() {
        const { aktivEnhet, henterMoterBool, henterVeilederBool, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker,
            moterMarkertForOverforing, markerMoteForOverforing, overforMoter, overtaMoterFeilet, harOvertattMoter, overtarMoter, hentMoter } = this.props;
        return (<Side tittel="Møteoversikt">
            <div>
                <NavigasjonsTopp lenker={[
                    {
                        tittel: 'Dine møter',
                        url: '/moteoversikt/dinemoter',
                        aktiv: false,
                    },
                    {
                        tittel: 'Enhetens møter',
                        url: '/moteoversikt/enhetensmoter',
                        aktiv: true,
                    },
                ]} />
            {
                (() => {
                    if (!aktivEnhet) {
                        return <Feilmelding tittel={"Ingen aktiv enhet"} melding={"Du må velge enhet i enhetsvelgeren i toppen av siden."} />;
                    }
                    if (henterMoterBool || henterVeilederBool) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moter) {
                        return <EnhetensMoter moterMarkertForOverforing={moterMarkertForOverforing} overforMoter={overforMoter}
                                              markerMoteForOverforing={markerMoteForOverforing} hentVirksomhet={hentVirksomhet}
                                              hentBruker={hentBruker} veileder={veileder} moter={moter} hentMoter={hentMoter}
                                              overtarMoter={overtarMoter} harOvertattMoter={harOvertattMoter} overtaMoterFeilet={overtaMoterFeilet} />;
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
    hentetEnhet: PropTypes.string,
    henterMoterBool: PropTypes.bool,
    henterVeilederBool: PropTypes.bool,
    overtaMoterFeilet: PropTypes.bool,
    harOvertattMoter: PropTypes.bool,
    overtarMoter: PropTypes.bool,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentEnhetsMoter: PropTypes.func,
    markerMoteForOverforing: PropTypes.func,
    resetOverforing: PropTypes.func,
    overforMoter: PropTypes.func,
    hentMoter: PropTypes.func,
    moterMarkertForOverforing: PropTypes.array,
    hentMoterFeiletBool: PropTypes.bool,
    veileder: PropTypes.object,
    aktivEnhet: PropTypes.string,
};

export const mapStateToProps = (state) => {
    const moter = state.moterEnhet.data;
    const moterMarkertForOverforing = state.overfor.data;
    moter.map((mote) => {
        moterMarkertForOverforing.filter((markertMoteUuid) => {
            return mote.moteUuid === markertMoteUuid;
        }).length > 0 ? mote.markert = true : mote.markert = false;
        return mote;
    });
    return {
        harOvertattMoter: state.overfor.sendt,
        overtarMoter: state.overfor.sender,
        overtaMoterFeilet: state.overfor.sendingFeilet,
        moterMarkertForOverforing,
        aktivEnhet: state.moterEnhet.aktivEnhet,
        hentetEnhet: state.moterEnhet.hentetEnhet,
        hentMoterFeiletBool: state.moterEnhet.hentingFeilet,
        henterVeilederBool: state.veileder.henter,
        henterMoterBool: state.moterEnhet.henter,
        moter,
        veileder: state.veileder.data,
    };
};

const EnhetensMoteContainer = connect(mapStateToProps, Object.assign({}, virksomhetActions, brukerActions, moterEnhetActions, moterActions))(Moteside);

export default EnhetensMoteContainer;
