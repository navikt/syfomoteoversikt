import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/Moter';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as moterActions from '../actions/moter_actions';
import * as brukerActions from '../actions/bruker_actions';
import * as moterEnhetActions from '../actions/moterEnhet_actions';
import { hentLocalStorageState, lagreState } from '../utils/stateLocalStorage';


export class Moteside extends Component {
    constructor(props) {
        super(props);

        this.state = {
            side: hentLocalStorageState('side', 'visMoter'),
        };
        this.visMoter = this.visMoter.bind(this);
        this.visMoterEnhet = this.visMoterEnhet.bind(this);
    }

    visMoter() {
        this.setState({
            side: 'visMoter',
        });
        lagreState('side', 'visMoter');
    }
    visMoterEnhet() {
        this.setState({
            side: 'visMoterEnhet',
        });
        lagreState('side', 'visMoterEnhet');
    }

    render() {
        const { henter, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker, moterEnhet } = this.props;

        return (<Side tittel="Møteoversikt">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moterEnhet && this.state.side === 'visMoterEnhet') {
                        return (<Moter
                            hentVirksomhet={hentVirksomhet}
                            hentBruker={hentBruker}
                            veileder={veileder}
                            moter={moterEnhet}
                            visMoter={this.visMoter}
                            visMoterEnhet={this.visMoterEnhet}
                            side={this.state.side} />);
                    } else if (moter && this.state.side === 'visMoter') {
                        return (<Moter
                            hentBruker={hentBruker}
                            veileder={veileder}
                            moter={moter}
                            visMoter={this.visMoter}
                            visMoterEnhet={this.visMoterEnhet}
                            side={this.state.side} />);
                    }
                    return <p>Bruker har ingen møter</p>;
                })()
            }
        </Side>);
    }
}

Moteside.propTypes = {
    moter: PropTypes.array,
    henter: PropTypes.bool,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    hentMoterFeiletBool: PropTypes.bool,
    veileder: PropTypes.object,
    moterEnhet: PropTypes.array,
};

export const mapStateToProps = (state) => {
    return {
        hentMoterFeiletBool: state.moter.hentingFeilet,
        henter: state.moter.henter || state.veileder.henter,
        moter: state.moter.data,
        veileder: state.veileder.data,
        moterEnhet: state.moterEnhet.data,
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, virksomhetActions, brukerActions, moterEnhetActions))(Moteside);

export default MoteContainer;
