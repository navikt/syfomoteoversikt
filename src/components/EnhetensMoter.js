import React from "react";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";

const EnhetensMoter = () => {
  const { overtaMoterFeilet } = useOverforMoter();
  const { harAktiveMoter } = useMoterEnhet();

  return (
    <div>
      {overtaMoterFeilet && (
        <AlertStripe className="blokk" type="advarsel">
          Det skjedde en feil så du ikke fikk overtatt møtene
          <br />
          Prøv igjen senere
        </AlertStripe>
      )}
      {!harAktiveMoter && (
        <div className="panel">
          <p>Enheten har ingen aktive møter.</p>
        </div>
      )}
      {harAktiveMoter && <MoteoversiktEnhet />}
    </div>
  );
};

export default EnhetensMoter;
