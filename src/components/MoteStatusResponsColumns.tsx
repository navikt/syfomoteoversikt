import React, { ReactElement } from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { responsTekst, statusTekst } from "@/utils/dialogmoterUtil";
import { ResponsColumn, StatusColumn } from "./MoteTable";

interface MoteStatusResponsColumnsProps {
  mote: DialogmoterDTO;
}

export const MoteStatusResponsColumns = ({
  mote,
}: MoteStatusResponsColumnsProps): ReactElement => {
  return (
    <>
      <StatusColumn>{statusTekst(mote)}</StatusColumn>
      <ResponsColumn>{responsTekst(mote)}</ResponsColumn>
    </>
  );
};
