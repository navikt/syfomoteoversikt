import React from "react";
import { Navigate } from "react-router-dom";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { mineMoterRoutePath } from "@/routers/AppRouter";
import { Button } from "@navikt/ds-react";
import { trackOnClick } from "@/amplitude/amplitude";

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
    <Button
      variant="primary"
      disabled={overforDialogmoter.isPending}
      onClick={() => {
        trackOnClick(texts.overta);
        handleClick();
      }}
    >
      {texts.overta}
    </Button>
  );
};
