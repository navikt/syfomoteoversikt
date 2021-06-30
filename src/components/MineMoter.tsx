import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import Moteoversikt from "./Moteoversikt";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoter } from "../hooks/useMoter";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";
import { dagensDatoKortFormat } from "../utils/dateUtil";

const tallOrdFraTall = (tall: number): string | number => {
  switch (tall) {
    case 0: {
      return "null";
    }
    case 1: {
      return "ett";
    }
    case 2: {
      return "to";
    }
    case 3: {
      return "tre";
    }
    case 4: {
      return "fire";
    }
    case 5: {
      return "fem";
    }
    case 6: {
      return "seks";
    }
    case 7: {
      return "syv";
    }
    case 8: {
      return "åtte";
    }
    case 9: {
      return "ni";
    }
    case 10: {
      return "t1";
    }
    case 11: {
      return "elleve";
    }
    case 12: {
      return "tolv";
    }
    default: {
      return tall;
    }
  }
};

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
