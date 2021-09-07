import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { Checkbox } from "nav-frontend-skjema";
import React from "react";
import { isDialogmote } from "@/utils/dialogmoterUtil";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";

interface OverforMoteProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const OverforMote = ({ mote }: OverforMoteProps) => {
  const { moterMarkert, dialogmoterMarkert, dispatch } = useMoteoverforing();
  const uuid = isDialogmote(mote) ? mote.uuid : mote.moteUuid;

  const isMoteMarkert = (): boolean => {
    return isDialogmote(mote)
      ? dialogmoterMarkert.some((markertUuid) => uuid === markertUuid)
      : moterMarkert.some((markertUuid: string) => uuid === markertUuid);
  };

  const handleChange = (checked: boolean): void => {
    if (isDialogmote(mote)) {
      dispatch({
        type: MoteoverforingActionType.MarkerDialogmote,
        dialogmoteUuid: uuid,
        overta: checked,
      });
    } else {
      dispatch({
        type: MoteoverforingActionType.MarkerMote,
        moteUuid: uuid,
        overta: checked,
      });
    }
  };

  return (
    <Checkbox
      label=""
      id={uuid}
      checked={isMoteMarkert()}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
};
