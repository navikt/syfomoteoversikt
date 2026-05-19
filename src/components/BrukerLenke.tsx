import React from "react";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";
import { Link } from "@navikt/ds-react";

const syfomodiapersonMoterUrl = fullNaisUrlDefault(
  "syfomodiaperson",
  "/sykefravaer/moteoversikt"
);

interface Props {
  fnr: string;
  navn: string;
}

export default function BrukerLenke({ fnr, navn }: Props) {
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
