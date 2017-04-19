import React, { PropTypes } from 'react';
import Moteoversikt from './Moteoversikt';
import { setMoteStatus } from '../utils/statuser';
import { dagensDatoKortFormat } from '../utils/index';
import { Varselstripe } from 'digisyfo-npm';

const Moter = ({ moter, hentVirksomhet, hentBruker, harOvertattMoter, moterMarkertForOverforing }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });

    return (<div>
        { harOvertattMoter && <div className="blokk panel"><Varselstripe type="suksess">
            <div>
                <p>{`Du har lagt til ${moterMarkertForOverforing.length} nye møter`}</p>
                <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
            </div>
        </Varselstripe></div>}

        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Du har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <Moteoversikt hentBruker={hentBruker} hentVirksomhet={hentVirksomhet} moter={moterMedStatus} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    visMoter: PropTypes.func,
    visMoterEnhet: PropTypes.func,
    harOvertattMoter: PropTypes.bool,
    moterMarkertForOverforing: PropTypes.array,
    side: PropTypes.string,
};

export default Moter;
