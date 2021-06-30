import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat, tallOrdFraTall } from "../utils";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoter } from "../hooks/useMoter";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";

const hentTallordTekst = (tall: number) => {
  const tallord = tallOrdFraTall(tall);
  return tall === 1 ? `${tallord} nytt møte` : `${tallord} nye møter`;
};

const Moter = (): ReactElement => {
  const { harOvertattMoter, moterMarkertForOverforing } = useOverforMoter();
  const { harVeilederAktiveDialogmoter } = useDialogmoter();
  const { harAktiveMoter } = useMoter();
  const harMoter = harAktiveMoter || harVeilederAktiveDialogmoter;

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
      {!harMoter && (
        <Panel>
          <p>Du har ingen aktive møter.</p>
        </Panel>
      )}
      {harMoter && <Moteoversikt />}
    </div>
  );
};

export default Moter;
