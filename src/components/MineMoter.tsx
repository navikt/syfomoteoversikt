import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { Element } from "nav-frontend-typografi";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";
import { useDialogmoterVeilederidentQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useVeiledersMoterQuery } from "@/data/moter/moterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";

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

const texts = {
  ingenMoter: "Du har ingen aktive møter.",
};

const Moter = (): ReactElement => {
  const aktivVeilederIdent = useAktivVeileder().data?.ident;
  const { antallOverfort } = useMoteoverforing();
  const dialogmoterQuery = useDialogmoterVeilederidentQuery();
  const moterQuery = useVeiledersMoterQuery();
  const harVeilederMoter = moterQuery.isSuccess && moterQuery.data.length > 0;
  const harVeilederDialogmoter = dialogmoterQuery.data?.some(
    ({ tildeltVeilederIdent }) => tildeltVeilederIdent === aktivVeilederIdent
  );
  const harMoter = harVeilederMoter || harVeilederDialogmoter;

  return (
    <div>
      {antallOverfort && (
        <Alertstripe className="blokk" type="suksess">
          <Element>{`Du har lagt til ${hentTallordTekst(
            antallOverfort
          )}`}</Element>
          <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </Alertstripe>
      )}
      {!harMoter && (
        <Panel>
          <p>{texts.ingenMoter}</p>
        </Panel>
      )}
      {harMoter && <Moteoversikt />}
    </div>
  );
};

export default Moter;
