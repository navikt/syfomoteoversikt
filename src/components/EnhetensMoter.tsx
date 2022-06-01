import React, { ReactElement } from "react";
import AlertStripe from "nav-frontend-alertstriper";
import MoteoversiktEnhet from "./MoteoversiktEnhet";
import { useOverforMoter } from "@/data/moter/useOverforMoter";
import { useOverforDialogmoter } from "@/data/dialogmoter/useOverforDialogmoter";
import { useEnhetensMoterQuery } from "@/data/moter/moterQueryHooks";
import { useEnhetensDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";

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
  const overforDialogmoter = useOverforDialogmoter();
  const overforMoter = useOverforMoter();
  const moterEnhetQuery = useEnhetensMoterQuery();
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const harMoter =
    (moterEnhetQuery.isSuccess && moterEnhetQuery.data.length > 0) ||
    (dialogmoterQuery.isSuccess && dialogmoterQuery.data.length > 0);

  return (
    <div>
      {overforMoter.isError && (
        <OverforFeilmelding>{texts.overtaMoterFeilet}</OverforFeilmelding>
      )}
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
