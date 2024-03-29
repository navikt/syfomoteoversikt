import React, { ReactElement } from "react";
import { Alert, Label } from "@navikt/ds-react";
import Moteoversikt from "../../components/Moteoversikt";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { Veileder } from "@/data/veiledere/veilederTypes";

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
      return "ti";
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

interface Props {
  aktivVeileder: Veileder;
  moter: DialogmoterDTO[];
}

const MineMoter = ({ aktivVeileder, moter }: Props): ReactElement => {
  const { antallOverfort } = useMoteoverforing();

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
      <Moteoversikt aktivVeileder={aktivVeileder} moter={moter} />
    </div>
  );
};

export default MineMoter;
