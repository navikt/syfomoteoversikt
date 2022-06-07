import React from "react";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { trackOnClick } from "@/amplitude/amplitude";
import { FnrColumn, TruncatedTableColumn } from "./MoteTable";
import { useBrukerQuery, useFnrQuery } from "@/data/bruker/brukerQueryHooks";
import { isDialogmote } from "@/utils/dialogmoterUtil";
import Lenke from "nav-frontend-lenker";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";

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
    <Lenke
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
    </Lenke>
  );
};

interface MoteArbeidstakerColumnsProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const MoteArbeidstakerColumns = ({
  mote,
}: MoteArbeidstakerColumnsProps) => {
  return isDialogmote(mote) ? (
    <DialogmoteArbeidstakerColumns dialogmote={mote} />
  ) : (
    <MoteplanleggerArbeidstakerColumns mote={mote} />
  );
};

interface DialogmoteArbeidstakerColumnsProps {
  dialogmote: DialogmoterDTO;
}

const DialogmoteArbeidstakerColumns = ({
  dialogmote,
}: DialogmoteArbeidstakerColumnsProps) => {
  const brukerQuery = useBrukerQuery(dialogmote.arbeidstaker.personIdent);
  const BrukersNavn = () => {
    if (brukerQuery.isLoading) {
      return <>{texts.henterNavn}</>;
    } else if (brukerQuery.data) {
      return (
        <BrukerLenke
          fnr={dialogmote.arbeidstaker.personIdent}
          navn={brukerQuery.data.navn}
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

interface MoteplanleggerArbeidstakerColumnsProps {
  mote: MoteDTO;
}

const MoteplanleggerArbeidstakerColumns = ({
  mote,
}: MoteplanleggerArbeidstakerColumnsProps) => {
  const brukerQuery = useBrukerQuery(mote.aktorId);
  const fnrQuery = useFnrQuery(mote.aktorId);

  const BrukersNavn = () => {
    if (brukerQuery.isLoading || fnrQuery.isLoading) {
      return <>{texts.henterNavn}</>;
    } else if (brukerQuery.data && fnrQuery.data) {
      return (
        <BrukerLenke fnr={fnrQuery.data.fnr} navn={brukerQuery.data.navn} />
      );
    } else {
      return <>{texts.notFound}</>;
    }
  };

  return (
    <>
      <FnrColumn>
        {fnrQuery.isLoading ? texts.henter : fnrQuery.data?.fnr}
      </FnrColumn>
      <TruncatedTableColumn>
        <BrukersNavn />
      </TruncatedTableColumn>
    </>
  );
};
