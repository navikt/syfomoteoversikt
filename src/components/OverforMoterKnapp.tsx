import {
  overforDialogmoter,
  overforMoter,
} from "../data/overfor/overfor_actions";
import React from "react";
import { useDispatch } from "react-redux";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { TrackedHovedknapp } from "./buttons/TrackedHovedknapp";

const texts = {
  overta: "Overta møter",
};

export const OverforMoterKnapp = () => {
  const dispatch = useDispatch();
  const {
    moterMarkertForOverforing,
    dialogmoterMarkertForOverforing,
    overforerMoter,
    overforerDialogmoter,
  } = useOverforMoter();
  const noMoterMarkert =
    moterMarkertForOverforing.length === 0 &&
    dialogmoterMarkertForOverforing.length === 0;

  const handleClick = () => {
    if (moterMarkertForOverforing.length > 0) {
      dispatch(overforMoter({ moteUuids: moterMarkertForOverforing }));
    }
    if (dialogmoterMarkertForOverforing.length > 0) {
      dispatch(
        overforDialogmoter({
          dialogmoteUuids: dialogmoterMarkertForOverforing,
        })
      );
    }
  };

  return (
    <TrackedHovedknapp
      disabled={overforerMoter || overforerDialogmoter || noMoterMarkert}
      onClick={handleClick}
    >
      {texts.overta}
    </TrackedHovedknapp>
  );
};
