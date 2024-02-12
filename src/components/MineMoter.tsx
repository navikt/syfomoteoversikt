import React, { ReactElement } from "react";
import { Label, Panel } from "@navikt/ds-react";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { Alert } from "@navikt/ds-react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { VeilederInfoDto } from "@/data/veiledere/veilederTypes";

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

interface Props {
  aktivVeileder: VeilederInfoDto;
  moter: DialogmoterDTO[];
}

const Moter = ({ aktivVeileder, moter }: Props): ReactElement => {
  const { antallOverfort } = useMoteoverforing();
  const harMoter = moter.some(
    ({ tildeltVeilederIdent }) => tildeltVeilederIdent === aktivVeileder.ident
  );

  return (
    <div>
      {antallOverfort && (
        <Alert size="small" variant="success" className="mb-8">
          <Label size="small">{`Du har lagt til ${hentTallordTekst(
            antallOverfort
          )}`}</Label>
          <br />
          <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </Alert>
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
