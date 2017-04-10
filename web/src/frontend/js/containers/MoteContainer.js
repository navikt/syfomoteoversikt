import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Moter from '../components/Moter';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as moterActions from '../actions/moter_actions';
import * as brukerActions from '../actions/bruker_actions';
import * as moterKontorActions from '../actions/moterKontor_actions';


export class Moteside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: 'visMoter',
        };
        this.visMoter = this.visMoter.bind(this);
        this.visMoterKontor = this.visMoterKontor.bind(this);
    }

    visMoter() {
        this.setState({
            side: 'visMoter',
        });
    }
    visMoterKontor() {
        this.setState({
            side: 'visMoterKontor',
        });
    }

    render() {
        const { henter, hentMoterFeiletBool, moter, veileder, hentVirksomhet, hentBruker, moterKontor } = this.props;

        return (<Side tittel="Møteoversikt">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (moterKontor && this.state.side === 'visMoterKontor') {
                        return (<Moter
                            hentVirksomhet={hentVirksomhet}
                            hentBruker={hentBruker}
                            veileder={veileder}
                            moter={moterKontor}
                            visMoter={this.visMoter}
                            visMoterKontor={this.visMoterKontor}
                            side={this.state.side} />);
                    } else if (moter && this.state.side === 'visMoter') {
                        return (<Moter
                            hentVirksomhet={hentVirksomhet}
                            hentBruker={hentBruker}
                            veileder={veileder}
                            moter={moter}
                            visMoter={this.visMoter}
                            visMoterKontor={this.visMoterKontor}
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
    moterKontor: PropTypes.array,
    visMoter: PropTypes.func,
    visMoterKontor: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        hentMoterFeiletBool: state.moter.hentingFeilet,
        henter: state.moter.henter || state.veileder.henter,
        moter: state.moter.data,
        veileder: state.veileder.data,
        moterKontor: state.moterKontor.data,
    };
};

const MoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, virksomhetActions, brukerActions, moterKontorActions))(Moteside);

export default MoteContainer;
