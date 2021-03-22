import React from "react";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat, tallOrdFraTall } from "../utils";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoter } from "../hooks/useMoter";

const hentTallordTekst = (tall) => {
  const tallord = tallOrdFraTall(tall);
  if (tall === 1) {
    return `${tallord} nytt møte`;
  }
  return `${tallord} nye møter`;
};

const Moter = () => {
  const { harOvertattMoter, moterMarkertForOverforing } = useOverforMoter();
  const { harAktiveMoter } = useMoter();

  return (
    <div>
      {harOvertattMoter && (
        <Alertstripe className="blokk" type="suksess">
          <p className="typo-element">{`Du har lagt til ${hentTallordTekst(
            moterMarkertForOverforing.length
          )}`}</p>
          <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </Alertstripe>
      )}
      {!harAktiveMoter && (
        <Panel>
          <p>Du har ingen aktive møter.</p>
        </Panel>
      )}
      {harAktiveMoter && <Moteoversikt />}
    </div>
  );
};

export default Moter;
