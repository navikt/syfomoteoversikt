import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { Checkbox } from "nav-frontend-skjema";
import {
  markerDialogmoteForOverforing,
  markerMoteForOverforing,
} from "@/data/overfor/overfor_actions";
import React from "react";
import { useOverforMoter } from "@/hooks/useOverforMoter";
import { useDispatch } from "react-redux";
import { isDialogmote } from "@/utils/dialogmoterUtil";

interface OverforMoteProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const OverforMote = ({ mote }: OverforMoteProps) => {
  const dispatch = useDispatch();
  const {
    moterMarkertForOverforing,
    dialogmoterMarkertForOverforing,
  } = useOverforMoter();

  const uuid = isDialogmote(mote) ? mote.uuid : mote.moteUuid;

  const isMoteMarkert = (): boolean => {
    return isDialogmote(mote)
      ? dialogmoterMarkertForOverforing.some(
          (markertDialogmoteUuid) => uuid === markertDialogmoteUuid
        )
      : moterMarkertForOverforing.some(
          (markertMoteUuid: string) => uuid === markertMoteUuid
        );
  };

  const handleChange = (checked: boolean): void => {
    if (isDialogmote(mote)) {
      dispatch(markerDialogmoteForOverforing(uuid, checked));
    } else {
      dispatch(markerMoteForOverforing(uuid, checked));
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
