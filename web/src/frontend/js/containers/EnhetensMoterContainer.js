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
import * as veilederActions from '../actions/veileder_actions';
import * as fnrActions from '../actions/fnr_actions';

export class Moteside extends Component {
    constructor(props) {
        super(props);
        if (props.aktivEnhet !== props.hentetEnhet) {
            props.hentEnhetsMoter(props.aktivEnhet);
        }
        if (props.harOvertattMoter) {
            props.resetOverforing();
            props.hentEnhetsMoter(props.aktivEnhet);
        }
    }

    componentDidUpdate() {
        const { aktivEnhet, hentEnhetsMoter, hentetEnhet } = this.props;
        if (hentetEnhet !== aktivEnhet) {
            hentEnhetsMoter(aktivEnhet);
        }
    }

    render() {
        const { aktivEnhet, hentFnr, henterMoterBool, hentMoterFeiletBool, moter, hentVirksomhet, hentBruker, hentVeileder,
            moterMarkertForOverforing, markerMoteForOverforing, overforMoter, overtaMoterFeilet, harOvertattMoter, overtarMoter, hentMoter, ledetekster } = this.props;

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
                    if (henterMoterBool) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moter) {
                        return (<EnhetensMoter moterMarkertForOverforing={moterMarkertForOverforing} overforMoter={overforMoter} hentVeileder={hentVeileder}
                            markerMoteForOverforing={markerMoteForOverforing} hentVirksomhet={hentVirksomhet}
                            hentFnr={hentFnr} hentBruker={hentBruker} moter={moter} hentMoter={hentMoter}
                            overtarMoter={overtarMoter} harOvertattMoter={harOvertattMoter} overtaMoterFeilet={overtaMoterFeilet} ledetekster={ledetekster} />);
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
    hentFnr: PropTypes.func,
    hentEnhetsMoter: PropTypes.func,
    markerMoteForOverforing: PropTypes.func,
    resetOverforing: PropTypes.func,
    overforMoter: PropTypes.func,
    hentMoter: PropTypes.func,
    hentVeileder: PropTypes.func,
    moterMarkertForOverforing: PropTypes.array,
    hentMoterFeiletBool: PropTypes.bool,
    aktivEnhet: PropTypes.string,
    ledetekster: PropTypes.object,
};

export const mapStateToProps = (state) => {
    const moter = state.moterEnhet.data;
    const moterMarkertForOverforing = state.overfor.data;
    moter.map((mote) => {
        mote.markert = moterMarkertForOverforing.filter((markertMoteUuid) => {
            return mote.moteUuid === markertMoteUuid;
        }).length > 0;
        return mote;
    });

    const veiledere = state.veiledere.data;
    moter.map((mote) => {
        veiledere.forEach((veileder) => {
            if (mote.eier === veileder.ident) {
                mote.veileder = veileder;
            }
        });
        return mote;
    });
    return {
        harOvertattMoter: state.overfor.sendt,
        overtarMoter: state.overfor.sender,
        overtaMoterFeilet: state.overfor.sendingFeilet,
        moterMarkertForOverforing,
        aktivEnhet: state.moterEnhet.aktivEnhet,
        hentetEnhet: state.moterEnhet.hentetEnhet,
        hentMoterFeiletBool: state.moterEnhet.hentingFeilet || state.ledetekster.hentingFeilet,
        henterMoterBool: state.moterEnhet.henter || state.ledetekster.henter,
        moter,
        ledetekster: state.ledetekster.data,
    };
};

const EnhetensMoteContainer = connect(mapStateToProps, Object.assign({}, virksomhetActions, brukerActions, fnrActions, moterEnhetActions, veilederActions))(Moteside);

export default EnhetensMoteContainer;
