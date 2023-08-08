import React from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { Checkbox } from "@navikt/ds-react";
import styled from "styled-components";

interface OverforMoteProps {
  mote: DialogmoterDTO;
}

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: -1em;
  margin-top: -1em;
`;

export const OverforMote = ({ mote }: OverforMoteProps) => {
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
    <StyledCheckbox
      id={uuid}
      checked={isMoteMarkert()}
      onChange={(e) => handleChange(e.target.checked)}
    >
      {""}
    </StyledCheckbox>
  );
};
