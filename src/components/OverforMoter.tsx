import React from "react";
import { Navigate } from "react-router-dom";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { Alert, Button } from "@navikt/ds-react";
import { mineMoterRoutePath } from "@/routers/AppRouter";
import { resolveErrorMessage } from "@/api/errors.ts";

const texts = {
  overta: "Overta møter",
  overtaDialogmoterFeilet:
    "Det skjedde en feil så du ikke fikk overtatt dialogmøte-innkallingene.",
  provIgjen: "Prøv igjen senere.",
};

export const OverforMoter = () => {
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
    <div className="flex flex-row gap-4 items-center">
      <Button
        variant="primary"
        disabled={overforDialogmoter.isPending}
        onClick={() => handleClick()}
        className="w-fit"
      >
        {texts.overta}
      </Button>
      {overforDialogmoter.isError && (
        <Alert size="small" variant="error">
          {resolveErrorMessage(overforDialogmoter.error)}
        </Alert>
      )}
    </div>
  );
};
