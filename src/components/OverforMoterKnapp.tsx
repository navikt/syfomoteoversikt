import React from "react";
import { TrackedHovedknapp } from "./buttons/TrackedHovedknapp";
import { useOverforMoter } from "@/data/moter/useOverforMoter";
import { Navigate } from "react-router-dom";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { mineMoterRoutePath } from "@/routers/AppRouter";

const texts = {
  overta: "Overta møter",
};

export const OverforMoterKnapp = () => {
  const { moterMarkert, dialogmoterMarkert } = useMoteoverforing();
  const overforDialogmoter = useOverforDialogmoter();
  const overforMoter = useOverforMoter();
  const harMarkertDialogmoter = dialogmoterMarkert.length > 0;
  const harMarkertMoter = moterMarkert.length > 0;
  const noMoterMarkert = !harMarkertDialogmoter && !harMarkertMoter;

  const handleClick = () => {
    if (harMarkertMoter) {
      overforMoter.mutate(moterMarkert);
    }
    if (harMarkertDialogmoter) {
      overforDialogmoter.mutate(dialogmoterMarkert);
    }
  };

  if (overforDialogmoter.isSuccess || overforMoter.isSuccess) {
    return <Navigate to={mineMoterRoutePath} />;
  }

  return (
    <TrackedHovedknapp
      disabled={
        overforMoter.isLoading || overforDialogmoter.isLoading || noMoterMarkert
      }
      onClick={handleClick}
    >
      {texts.overta}
    </TrackedHovedknapp>
  );
};
