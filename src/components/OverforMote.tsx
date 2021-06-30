import { MoteDTO } from "../data/moter/moterTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { Checkbox } from "nav-frontend-skjema";
import { markerMoteForOverforing } from "../data/moter/overfor_actions";
import React from "react";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useDispatch } from "react-redux";
import { isDialogmote } from "../utils/dialogmoterUtil";

interface OverforMoteProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const OverforMote = ({ mote }: OverforMoteProps) => {
  const dispatch = useDispatch();
  const { moterMarkertForOverforing } = useOverforMoter();

  if (isDialogmote(mote)) {
    return null; // TODO: Implement overforing av dialogmoter
  }

  const { moteUuid } = mote;
  const markert = moterMarkertForOverforing.some(
    (markertMoteUuid: string) => moteUuid === markertMoteUuid
  );

  return (
    <>
      <Checkbox
        label=""
        id={moteUuid}
        checked={markert}
        onChange={(e) => {
          dispatch(markerMoteForOverforing(mote.moteUuid, e.target.checked));
        }}
      />
      <label htmlFor={moteUuid} />
    </>
  );
};
