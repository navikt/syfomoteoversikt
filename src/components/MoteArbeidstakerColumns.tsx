import React from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { trackOnClick } from "@/amplitude/amplitude";
import { FnrColumn, TruncatedTableColumn } from "./MoteTable";
import { useBrukerQuery } from "@/data/bruker/brukernavnQueryHooks";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";
import { Link } from "@navikt/ds-react";

const texts = {
  henter: "Henter...",
  henterNavn: "Henter navn...",
  notFound: "Fant ikke navn",
  trackGoToSyfoModia: "Lenke til bruker i syfomodiaperson",
};

const syfomodiapersonMoterUrl = fullNaisUrlDefault(
  "syfomodiaperson",
  "/sykefravaer/moteoversikt"
);

interface BrukerLenkeProps {
  fnr: string;
  navn: string;
}

const BrukerLenke = ({ fnr, navn }: BrukerLenkeProps) => {
  const aktivBruker = useAktivBruker();
  return (
    <Link
      onClick={(event) => {
        event.preventDefault();
        trackOnClick(texts.trackGoToSyfoModia);
        aktivBruker.mutate(fnr, {
          onSuccess: () => {
            window.location.href = syfomodiapersonMoterUrl;
          },
        });
      }}
      href={syfomodiapersonMoterUrl}
    >
      {navn}
    </Link>
  );
};

interface DialogmoteArbeidstakerColumnsProps {
  dialogmote: DialogmoterDTO;
}

export const DialogmoteArbeidstakerColumns = ({
  dialogmote,
}: DialogmoteArbeidstakerColumnsProps) => {
  const brukernavnQuery = useBrukerQuery(dialogmote.arbeidstaker.personIdent);
  const BrukersNavn = () => {
    if (brukernavnQuery.isInitialLoading) {
      return <>{texts.henterNavn}</>;
    } else if (brukernavnQuery.data) {
      return (
        <BrukerLenke
          fnr={dialogmote.arbeidstaker.personIdent}
          navn={brukernavnQuery.data.navn}
        />
      );
    } else {
      return <>{texts.notFound}</>;
    }
  };

  return (
    <>
      <FnrColumn>{dialogmote.arbeidstaker.personIdent}</FnrColumn>
      <TruncatedTableColumn>
        <BrukersNavn />
      </TruncatedTableColumn>
    </>
  );
};
