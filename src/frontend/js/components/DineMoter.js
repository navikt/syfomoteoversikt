import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import Alertstripe from 'nav-frontend-alertstriper';
import Moteoversikt from './Moteoversikt';
import { setMoteStatus } from '../utils/statuser';
import { dagensDatoKortFormat, tallOrdFraTall } from '../utils/index';

const hentTallordTekst = (tall) => {
    const tallord = tallOrdFraTall(tall);
    if (tall === 1) {
        return `${tallord} nytt møte`;
    }
    return `${tallord} nye møter`;
};

const Moter = ({ props }) => {
    const { moter, harOvertattMoter, moterMarkertForOverforing } = props;

    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });
    return (<div>
        { harOvertattMoter && <Alertstripe className="blokk" type="suksess">
            <p className="typo-element">{`Du har lagt til ${hentTallordTekst(moterMarkertForOverforing.length)}`}</p>
            <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </Alertstripe>
        }
        {
            moterMedStatus.length === 0 && (<Panel>
                <p>Du har ingen aktive møter.</p>
            </Panel>)
        }
        {
            moterMedStatus.length > 0 && <Moteoversikt {...props} />
        }
    </div>);
};

Moter.propTypes = {
    props: PropTypes.object,
    moter: PropTypes.array,
    moterMarkertForOverforing: PropTypes.array,
    harOvertattMoter: PropTypes.bool,
};

export default Moter;
