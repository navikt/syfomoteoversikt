import React from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { useBrukerQuery } from "@/data/bruker/brukernavnQueryHooks";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";
import { Link, Table } from "@navikt/ds-react";

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

function BrukerLenke({ fnr, navn }: BrukerLenkeProps) {
  const aktivBruker = useAktivBruker();
  return (
    <Link
      onClick={(event) => {
        event.preventDefault();
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
}

function BrukersNavn({ personident }: { personident: string }) {
  const brukernavnQuery = useBrukerQuery(personident);

  if (brukernavnQuery.isLoading) {
    return <>{texts.henterNavn}</>;
  } else if (brukernavnQuery.data) {
    return <BrukerLenke fnr={personident} navn={brukernavnQuery.data.navn} />;
  } else {
    return <>{texts.notFound}</>;
  }
}

interface DialogmoteArbeidstakerColumnsProps {
  dialogmote: DialogmoterDTO;
}

export function DialogmoteArbeidstakerColumns({
  dialogmote,
}: DialogmoteArbeidstakerColumnsProps) {
  return (
    <>
      <Table.DataCell textSize="small">
        {dialogmote.arbeidstaker.personIdent}
      </Table.DataCell>
      <Table.DataCell textSize="small">
        <BrukersNavn personident={dialogmote.arbeidstaker.personIdent} />
      </Table.DataCell>
    </>
  );
}
