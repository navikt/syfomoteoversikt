import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { antallDeltakerSvarTekst, moteStatusTekst } from "@/utils/moterUtil";
import React, { ReactElement } from "react";
import {
  isDialogmote,
  responsTekst,
  statusTekst,
} from "@/utils/dialogmoterUtil";
import { ResponsColumn, StatusColumn } from "./MoteTable";

interface MoteStatusResponsColumnsProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const MoteStatusResponsColumns = ({
  mote,
}: MoteStatusResponsColumnsProps): ReactElement => {
  const responsKolonneTekst = isDialogmote(mote)
    ? responsTekst(mote)
    : antallDeltakerSvarTekst(mote);
  const statusKolonneTekst = isDialogmote(mote)
    ? statusTekst(mote)
    : moteStatusTekst(mote);

  return (
    <>
      <StatusColumn>{statusKolonneTekst}</StatusColumn>
      <ResponsColumn>{responsKolonneTekst}</ResponsColumn>
    </>
  );
};
