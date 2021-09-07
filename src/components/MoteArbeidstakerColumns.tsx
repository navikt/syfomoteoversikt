import React from "react";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { syfomodiapersonMoterUrl } from "@/utils/lenkeUtil";
import { trackOnClick } from "@/amplitude/amplitude";
import { FnrColumn, TruncatedTableColumn } from "./MoteTable";
import { useBrukerQuery, useFnrQuery } from "@/data/bruker/brukerQueryHooks";
import { isDialogmote } from "@/utils/dialogmoterUtil";

const texts = {
  henter: "Henter navn",
  notFound: "Fant ikke navn",
  trackGoToSyfoModia: "Lenke til bruker i syfomodiaperson",
};

interface MoteArbeidstakerColumnsProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const MoteArbeidstakerColumns = ({
  mote,
}: MoteArbeidstakerColumnsProps) => {
  const brukerIdent = isDialogmote(mote)
    ? mote.arbeidstaker.personIdent
    : mote.aktorId;
  const brukerQuery = useBrukerQuery(brukerIdent);
  const fnrQuery = useFnrQuery(brukerIdent);

  const BrukersNavn = () => {
    if (brukerQuery.isLoading || fnrQuery.isLoading) {
      return <>{texts.henter}</>;
    } else if (brukerQuery.data && fnrQuery.data) {
      return (
        <a
          className="lenke"
          onClick={() => trackOnClick(texts.trackGoToSyfoModia)}
          href={syfomodiapersonMoterUrl(fnrQuery.data.fnr)}
        >
          {brukerQuery.data.navn}
        </a>
      );
    } else {
      return <>{texts.notFound}</>;
    }
  };

  return (
    <>
      <FnrColumn>{fnrQuery.data?.fnr}</FnrColumn>
      <TruncatedTableColumn>
        <BrukersNavn />
      </TruncatedTableColumn>
    </>
  );
};
