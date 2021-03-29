import { syfomodiapersonMoterUrl } from "../utils/lenkeUtil";
import React, { ReactElement } from "react";
import { MoteDeltakerDTO } from "../data/moter/moterTypes";

interface BrukerProps {
  bruker?: MoteDeltakerDTO;
}

export const BrukersNavn = ({ bruker }: BrukerProps): ReactElement => {
  if (bruker?.navn && bruker?.fnr) {
    return (
      <a className="lenke" href={syfomodiapersonMoterUrl(bruker.fnr)}>
        {bruker.navn}
      </a>
    );
  } else if (!bruker?.fnr || !bruker?.navn) {
    return <>Henter navn...</>;
  }
  return <>Fant ikke navn</>;
};
