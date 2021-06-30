import React, { ReactElement } from "react";
import { getDatoFraZulu } from "../utils";
import { getMoteDato } from "../utils/moterUtil";
import { MoteDTO } from "../data/moter/moterTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import {
  Arbeidsgiver,
  useMoteArbeidsgiver,
} from "../hooks/useMoteArbeidsgiver";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { MoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";

interface MoteProps {
  mote: MoteDTO | DialogmoterDTO;
}

const Mote = ({ mote }: MoteProps): ReactElement => {
  const arbeidsgiver = useMoteArbeidsgiver(mote);

  const finnVirksomhet = (arbeidsgiver?: Arbeidsgiver): string => {
    if (arbeidsgiver?.virksomhet) {
      return arbeidsgiver.virksomhet;
    } else if (arbeidsgiver?.orgnummer) {
      return "Henter virksomhet...";
    }
    return "Fant ikke virksomheten";
  };

  return (
    <tr>
      <td>{getDatoFraZulu(getMoteDato(mote))}</td>
      <MoteArbeidstakerColumns mote={mote} />
      <td>{arbeidsgiver?.leder ?? "Ukjent"}</td>
      <td>{finnVirksomhet(arbeidsgiver)}</td>
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default Mote;
