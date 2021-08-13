import React, { ReactElement } from "react";
import { getMoteDato } from "@/utils/moterUtil";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { Arbeidsgiver, useMoteArbeidsgiver } from "@/hooks/useMoteArbeidsgiver";
import { MoteStatusResponsColumns } from "./MoteStatusResponsColumns";
import { MoteArbeidstakerColumns } from "./MoteArbeidstakerColumns";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { MoteDatoColumn, TruncatedTableColumn } from "./MoteTable";

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
      <MoteDatoColumn>{getDatoFraZulu(getMoteDato(mote))}</MoteDatoColumn>
      <MoteArbeidstakerColumns mote={mote} />
      <TruncatedTableColumn>
        {finnVirksomhet(arbeidsgiver)}
      </TruncatedTableColumn>
      <MoteStatusResponsColumns mote={mote} />
    </tr>
  );
};

export default Mote;
