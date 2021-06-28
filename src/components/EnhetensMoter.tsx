import React, { ReactElement } from "react";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";

const EnhetensMoter = (): ReactElement => {
  const { overtaMoterFeilet } = useOverforMoter();
  const { harAktiveMoter } = useMoterEnhet();
  const { harAktiveDialogmoter } = useDialogmoter();
  const harMoter = harAktiveMoter || harAktiveDialogmoter;

  return (
    <div>
      {overtaMoterFeilet && (
        <AlertStripe className="blokk" type="advarsel">
          Det skjedde en feil så du ikke fikk overtatt møtene
          <br />
          Prøv igjen senere
        </AlertStripe>
      )}
      {!harMoter && (
        <div className="panel">
          <p>Enheten har ingen aktive møter.</p>
        </div>
      )}
      {harMoter && <MoteoversiktEnhet />}
    </div>
  );
};

export default EnhetensMoter;
