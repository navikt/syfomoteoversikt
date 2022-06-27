import React from "react";
import { TrackedHovedknapp } from "./buttons/TrackedHovedknapp";
import { Navigate } from "react-router-dom";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { mineMoterRoutePath } from "@/routers/AppRouter";

const texts = {
  overta: "Overta møter",
};

export const OverforMoterKnapp = () => {
  const { dialogmoterMarkert } = useMoteoverforing();
  const overforDialogmoter = useOverforDialogmoter();
  const harMarkertDialogmoter = dialogmoterMarkert.length > 0;

  const handleClick = () => {
    if (harMarkertDialogmoter) {
      overforDialogmoter.mutate(dialogmoterMarkert);
    }
  };

  if (overforDialogmoter.isSuccess) {
    return <Navigate to={mineMoterRoutePath} />;
  }

  return (
    <TrackedHovedknapp
      disabled={overforDialogmoter.isLoading}
      onClick={handleClick}
    >
      {texts.overta}
    </TrackedHovedknapp>
  );
};
