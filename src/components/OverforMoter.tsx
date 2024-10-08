import React from "react";
import { Navigate } from "react-router-dom";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { mineMoterRoutePath } from "@/routers/AppRouter";
import { Button } from "@navikt/ds-react";
import { trackEvent, trackOnClick } from "@/amplitude/amplitude";

const texts = {
  overta: "Overta møter",
};

export const OverforMoter = () => {
  const { dialogmoterMarkert } = useMoteoverforing();
  const overforDialogmoter = useOverforDialogmoter();
  const harMarkertDialogmoter = dialogmoterMarkert.length > 0;

  const handleClick = () => {
    if (harMarkertDialogmoter) {
      overforDialogmoter.mutate(dialogmoterMarkert, {
        onSuccess: () => {
          trackEvent("moter overtatt", {
            antall: `${dialogmoterMarkert.length}`,
          });
        },
      });
    }
  };

  if (overforDialogmoter.isSuccess) {
    return <Navigate to={mineMoterRoutePath} />;
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="primary"
        disabled={overforDialogmoter.isPending}
        onClick={() => {
          trackOnClick(texts.overta);
          handleClick();
        }}
        className="w-fit"
      >
        {texts.overta}
      </Button>
    </div>
  );
};
