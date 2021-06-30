import { MoteDTO } from "../data/moter/moterTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { antallDeltakerSvarTekst, moteStatusTekst } from "../utils/moterUtil";
import React, { ReactElement } from "react";
import {
  dialogmoteStatusTekst,
  isDialogmote,
  antallLesteVarslerTekst,
} from "../utils/dialogmoterUtil";

interface MoteStatusResponsColumnsProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const MoteStatusResponsColumns = ({
  mote,
}: MoteStatusResponsColumnsProps): ReactElement => {
  const responsTekst = isDialogmote(mote)
    ? antallLesteVarslerTekst(mote)
    : antallDeltakerSvarTekst(mote);
  const statusTekst = isDialogmote(mote)
    ? dialogmoteStatusTekst(mote)
    : moteStatusTekst(mote);

  return (
    <>
      <td>{statusTekst}</td>
      <td>{responsTekst}</td>
    </>
  );
};
