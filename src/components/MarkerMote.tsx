import React from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { Checkbox } from "@navikt/ds-react";

interface Props {
  mote: DialogmoterDTO;
}

export const MarkerMote = ({ mote }: Props) => {
  const { dialogmoterMarkert, dispatch } = useMoteoverforing();
  const uuid = mote.uuid;

  const isMoteMarkert = (): boolean => {
    return dialogmoterMarkert.some((markertUuid) => uuid === markertUuid);
  };

  const handleChange = (checked: boolean): void => {
    dispatch({
      type: MoteoverforingActionType.MarkerDialogmote,
      dialogmoteUuid: uuid,
      overta: checked,
    });
  };

  return (
    <Checkbox
      id={uuid}
      checked={isMoteMarkert()}
      onChange={(e) => handleChange(e.target.checked)}
    >
      {""}
    </Checkbox>
  );
};
