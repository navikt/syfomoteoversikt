import React, { ReactElement } from "react";
import { Panel } from "@navikt/ds-react";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { Element } from "nav-frontend-typografi";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import styled from "styled-components";
import { Alert } from "@navikt/ds-react";

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

const StyledAlert = styled(Alert)`
  margin-bottom: 2em;
`;

const Moter = (): ReactElement => {
  const aktivVeilederIdent = useAktivVeileder().data?.ident;
  const { antallOverfort } = useMoteoverforing();
  const dialogmoterQuery = useMineDialogmoterQuery();
  const harMoter = dialogmoterQuery.data?.some(
    ({ tildeltVeilederIdent }) => tildeltVeilederIdent === aktivVeilederIdent
  );

  return (
    <div>
      {antallOverfort && (
        <StyledAlert size="small" variant="success">
          <Element>{`Du har lagt til ${hentTallordTekst(
            antallOverfort
          )}`}</Element>
          <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </StyledAlert>
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
