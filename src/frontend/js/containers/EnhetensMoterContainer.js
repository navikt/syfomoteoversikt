import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Column } from 'nav-frontend-grid';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import NavigasjonsTopp from '../components/NavigasjonsTopp';
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
        const { aktivEnhet, henterMoterBool, hentMoterFeiletBool, moter } = this.props;

        return (<Side tittel="Møteoversikt">
            <Column className="col-xs-12">
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
                    } else if (henterMoterBool) {
                        return (<Row className="row-centered">
                            <NavFrontendSpinner type="XL" />
                        </Row>);
                    } else if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    } else if (moter) {
                        return (<EnhetensMoter props={this.props} />);
                    }
                    return <p>Bruker har ingen møter</p>;
                })()
            }
            </Column>
        </Side>);
    }
}

Moteside.propTypes = {
    moter: PropTypes.array,
    hentetEnhet: PropTypes.string,
    henterMoterBool: PropTypes.bool,
    harOvertattMoter: PropTypes.bool,
    hentEnhetsMoter: PropTypes.func,
    resetOverforing: PropTypes.func,
    hentMoterFeiletBool: PropTypes.bool,
    aktivEnhet: PropTypes.string,
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
