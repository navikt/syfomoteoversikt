import React, { PropTypes } from 'react';
import Moteoversikt from './Moteoversikt';

export const erSvarMottatt = (mote) => {
    let svar = mote.deltakere.map((deltaker) => {
        return deltaker.svar;
    });
    svar = [].concat.apply([], svar);
    const mottatteSvar = svar.filter((s) => {
        return s.valgt;
    });
    let mottatteAvvik = mote.deltakere.map((deltaker) => {
        return deltaker.avvik;
    });
    mottatteAvvik = [].concat.apply([], mottatteAvvik);
    return mottatteSvar.length > 0 || mottatteAvvik.length > 0;
};

export const setMoteStatus = (mote) => {
    if (mote.status === 'BEKREFTET' || mote.status === 'AVBRUTT') {
        return mote;
    }
    const svarMottatt = erSvarMottatt(mote);
    if (svarMottatt) {
        return Object.assign({}, mote, {
            status: 'SVAR_MOTTATT',
        });
    }
    return mote;
};

const Moter = ({ moter, hentVirksomhet, hentBruker, visMoter, visMoterEnhet, side }) => {
    const moterMedStatus = moter.map(setMoteStatus).filter((mote) => {
        return mote.status !== 'AVBRUTT';
    });

    return (<div>
        <header className="navigasjon">
            <h2 className="navigasjon__element">
                <div className={`navigasjon__element__inner ${side === 'visMoter' ? 'navigasjon__element__inner--active' : ''}`}>
                    <span onClick={visMoter}>Dine møter</span>
                </div>
            </h2>
            <h2 className={`navigasjon__element ${side}`}>
                <div className={`navigasjon__element__inner ${side === 'visMoterEnhet' ? 'navigasjon__element__inner--active' : ''}`}>
                    <span onClick={visMoterEnhet}>Enhets Møter</span>
                </div>
            </h2>
        </header>
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
    side: PropTypes.string,
};

export default Moter;
