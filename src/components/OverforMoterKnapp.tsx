import { Hovedknapp } from "nav-frontend-knapper";
import { overforMoter } from "../data/moter/overfor_actions";
import React from "react";
import { useDispatch } from "react-redux";
import { useOverforMoter } from "../hooks/useOverforMoter";

export const OverforMoterKnapp = () => {
  const dispatch = useDispatch();
  const { moterMarkertForOverforing, overtarMoter } = useOverforMoter();

  return (
    <div className="knapperad">
      <Hovedknapp
        disabled={overtarMoter || moterMarkertForOverforing.length === 0}
        onClick={() => {
          dispatch(
            overforMoter({
              moteUuidListe: moterMarkertForOverforing,
            })
          );
        }}
      >
        Overta møter
      </Hovedknapp>
    </div>
  );
};
