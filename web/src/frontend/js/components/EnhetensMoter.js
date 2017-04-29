import React, { PropTypes } from 'react';
import MoteoversiktEnhet from './MoteoversiktEnhet';
import { setMoteStatus } from '../utils/statuser';
import { Varselstripe } from 'digisyfo-npm';

const Moter = ({ moter, hentVirksomhet, hentFnr, hentBruker, markerMoteForOverforing, overforMoter, hentMoter, hentVeileder,
    moterMarkertForOverforing, aktivEnhet, overtarMoter, harOvertattMoter, overtaMoterFeilet }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });
    return (<div>
        {overtaMoterFeilet && <div className="blokk panel"><Varselstripe type="feil">
            <div>
            <p>Det skjedde en feil så du ikke fikk overtatt møtene</p>
            <label>Prøv igjen senere</label>
            </div>
        </Varselstripe></div>}
        {
            moterMedStatus.length === 0 && (<div className="panel">
                <p>Enheten har ingen aktive møter.</p>
            </div>)
        }
        {
            moterMedStatus.length > 0 && <MoteoversiktEnhet hentFnr={hentFnr} aktivEnhet={aktivEnhet} moterMarkertForOverforing={moterMarkertForOverforing} hentVeileder={hentVeileder}
                overforMoter={overforMoter} markerMoteForOverforing={markerMoteForOverforing} hentMoter={hentMoter}
                overtarMoter={overtarMoter} harOvertattMoter={harOvertattMoter} overtaMoterFeilet={overtaMoterFeilet}
                hentBruker={hentBruker} hentVirksomhet={hentVirksomhet} moter={moterMedStatus} />
        }
    </div>);
};

Moter.propTypes = {
    moter: PropTypes.array,
    hentVirksomhet: PropTypes.func,
    hentBruker: PropTypes.func,
    visMoter: PropTypes.func,
    visMoterEnhet: PropTypes.func,
    hentMoter: PropTypes.func,
    aktivEnhet: PropTypes.string,
    hentVeileder: PropTypes.func,
    overforMoter: PropTypes.func,
    overtarMoter: PropTypes.bool,
    harOvertattMoter: PropTypes.bool,
    overtaMoterFeilet: PropTypes.bool,
    markerMoteForOverforing: PropTypes.func,
    moterMarkertForOverforing: PropTypes.array,
    side: PropTypes.string,
};

export default Moter;
