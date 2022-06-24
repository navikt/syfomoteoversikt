import React, { ReactElement } from "react";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";

const texts = {
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
  const overforDialogmoter = useOverforDialogmoter();
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const harMoter =
    dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0;

  return (
    <div>
      {overforDialogmoter.isError && (
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
