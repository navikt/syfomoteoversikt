import React from "react";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { Button } from "@navikt/ds-react";

const texts = {
  overta: "Overta møter",
  overtaDialogmoterFeilet:
    "Det skjedde en feil så du ikke fikk overtatt dialogmøte-innkallingene.",
  provIgjen: "Prøv igjen senere.",
};

interface Props {
  isPending: boolean;
  onOverfor: (dialogmoteUuids: string[]) => void;
}

export const OverforMoter = ({ isPending, onOverfor }: Props) => {
  const { dialogmoterMarkert } = useMoteoverforing();
  const harMarkertDialogmoter = dialogmoterMarkert.length > 0;

  const handleClick = () => {
    if (harMarkertDialogmoter) {
      onOverfor(dialogmoterMarkert);
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isPending}
      onClick={() => handleClick()}
      className="w-fit"
    >
      {texts.overta}
    </Button>
  );
};
