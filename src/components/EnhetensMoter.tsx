import React, { ReactElement } from "react";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforMoter } from "../hooks/useOverforMoter";
import { useMoterEnhet } from "../hooks/useMoterEnhet";
import { useDialogmoter } from "../data/dialogmoter/dialogmoter_hooks";
import { Redirect } from "react-router-dom";

const texts = {
  overtaMoterFeilet:
    "Det skjedde en feil så du ikke fikk overtatt de planlagte møtene.",
  overtaDialogmoterFeilet:
    "Det skjedde en feil så du ikke fikk overtatt dialogmøte-innkallingene.",
  provIgjen: "Prøv igjen senere.",
  ingenMoter: "Enheten har ingen aktive møter.",
};

interface OverforFeilmeldingProps {
  children: string;
}

const OverforFeilmelding = ({ children }: OverforFeilmeldingProps) => (
  <AlertStripe className="blokk" type="advarsel">
    {children}
    <br />
    {texts.provIgjen}
  </AlertStripe>
);

const EnhetensMoter = (): ReactElement => {
  const {
    overforMoterFeilet,
    overforDialogmoterFeilet,
    moterOverfort,
    dialogmoterOverfort,
  } = useOverforMoter();
  const { harAktiveMoter } = useMoterEnhet();
  const { harAktiveDialogmoter } = useDialogmoter();
  const harMoter = harAktiveMoter || harAktiveDialogmoter;

  if (moterOverfort || dialogmoterOverfort) {
    return <Redirect to="/syfomoteoversikt/minemoter" />;
  }

  return (
    <div>
      {overforMoterFeilet && (
        <OverforFeilmelding>{texts.overtaMoterFeilet}</OverforFeilmelding>
      )}
      {overforDialogmoterFeilet && (
        <OverforFeilmelding>{texts.overtaDialogmoterFeilet}</OverforFeilmelding>
      )}
      {!harMoter && (
        <div className="panel">
          <p>{texts.ingenMoter}</p>
        </div>
      )}
      {harMoter && <MoteoversiktEnhet />}
    </div>
  );
};

export default EnhetensMoter;
