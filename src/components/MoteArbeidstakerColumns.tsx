import React, { ReactElement } from "react";
import { Arbeidstaker, useMoteArbeidstaker } from "@/hooks/useMoteArbeidstaker";
import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { syfomodiapersonMoterUrl } from "@/utils/lenkeUtil";
import { trackOnClick } from "@/amplitude/amplitude";
import { FnrColumn, TruncatedTableColumn } from "./MoteTable";

interface Props {
  bruker?: Arbeidstaker;
}

const texts = {
  henter: "Henter navn",
  notFound: "Fant ikke navn",
  trackGoToSyfoModia: "Lenke til bruker i syfomodiaperson",
};

const BrukersNavn = ({ bruker }: Props): ReactElement => {
  if (bruker?.navn && bruker?.fnr) {
    return (
      <a
        className="lenke"
        onClick={() => trackOnClick(texts.trackGoToSyfoModia)}
        href={syfomodiapersonMoterUrl(bruker.fnr)}
      >
        {bruker.navn}
      </a>
    );
  } else if (!bruker?.fnr || !bruker?.navn) {
    return <>{texts.henter}</>;
  }
  return <>{texts.notFound}</>;
};

interface MoteArbeidstakerColumnsProps {
  mote: MoteDTO | DialogmoterDTO;
}

export const MoteArbeidstakerColumns = ({
  mote,
}: MoteArbeidstakerColumnsProps) => {
  const arbeidstaker = useMoteArbeidstaker(mote);
  return (
    <>
      <FnrColumn>{arbeidstaker?.fnr}</FnrColumn>
      <TruncatedTableColumn>
        <BrukersNavn bruker={arbeidstaker} />
      </TruncatedTableColumn>
    </>
  );
};
