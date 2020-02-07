import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Column } from 'nav-frontend-grid';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import Moter from '../components/MineMoter';
import NavigasjonsTopp from '../components/NavigasjonsTopp';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as moterActions from '../actions/moter_actions';
import * as brukerActions from '../actions/bruker_actions';
import * as fnrActions from '../actions/fnr_actions';

export class Moteside extends Component {
    constructor(props) {
        super(props);
        if (props.harOvertattMoter || (!props.henterMoterBool && !props.hentMoterFeiletBool && props.moter.length === 0)) {
            props.hentMoter();
        }
    }

    render() {
        const { henterMoterBool, hentMoterFeiletBool, moter } = this.props;

        return (<Side tittel="Møteoversikt">
            <Column className="col-xs-12">
                <NavigasjonsTopp lenker={[
                    {
                        tittel: 'Mine møter',
                        url: '/syfomoteoversikt/minemoter',
                        aktiv: true,
                    },
                    {
                        tittel: 'Enhetens møter',
                        url: '/syfomoteoversikt/enhetensmoter',
                        aktiv: false,
                    },
                ]} />
                {
                    (() => {
                        if (henterMoterBool) {
                            return (<Row className="row-centered">
                                <NavFrontendSpinner type="XL" />
                            </Row>);
                        } else if (hentMoterFeiletBool) {
                            return <Feilmelding />;
                        } else if (moter) {
                            return (<Moter props={this.props} />);
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
    hentMoter: PropTypes.func,
    henterMoterBool: PropTypes.bool,
    harOvertattMoter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    return {
        harOvertattMoter: state.overfor.sendt,
        hentMoterFeiletBool: state.moter.hentingFeilet,
        henterMoterBool: state.moter.henter,
        moter: state.moter.data,
        moterMarkertForOverforing: state.overfor.data,
    };
};

const EnhetensMoteContainer = connect(mapStateToProps, Object.assign({}, virksomhetActions, brukerActions, moterActions, fnrActions))(Moteside);

export default EnhetensMoteContainer;
