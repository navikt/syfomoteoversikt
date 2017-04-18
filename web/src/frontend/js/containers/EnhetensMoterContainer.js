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

export class Moteside extends Component {
    constructor(props) {
        super(props);
        if (props.aktivEnhet !== props.hentetEnhet) {
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
        const { henterMoterBool, henterVeilederBool, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker, markerMoteForOverforing, aktivEnhet } = this.props;
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
                        return <EnhetensMoter markerMoteForOverforing={markerMoteForOverforing} hentVirksomhet={hentVirksomhet} hentBruker={hentBruker} veileder={veileder} moter={moter} />;
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
    aktivEnhet: PropTypes.string,
    hentetEnhet: PropTypes.string,
    henterMoterBool: PropTypes.bool,
    henterVeilederBool: PropTypes.bool,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentEnhetsMoter: PropTypes.func,
    markerMoteForOverforing: PropTypes.func,
    hentMoterFeiletBool: PropTypes.bool,
    veileder: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return {
        aktivEnhet: state.moterEnhet.aktivEnhet,
        hentetEnhet: state.moterEnhet.hentetEnhet,
        hentMoterFeiletBool: state.moterEnhet.hentingFeilet,
        henterVeilederBool: state.veileder.henter,
        henterMoterBool: state.moter.henter,
        moter: state.moterEnhet.data,
        veileder: state.veileder.data,
    };
};

const EnhetensMoteContainer = connect(mapStateToProps, Object.assign({}, virksomhetActions, brukerActions, moterEnhetActions))(Moteside);

export default EnhetensMoteContainer;
