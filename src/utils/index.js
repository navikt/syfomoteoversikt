import React from "react";
import { syfomodiapersonMoterUrl } from "./lenkeUtil";

export const tallOrdFraTall = (tall) => {
  switch (tall) {
    case 0: {
      return "null";
    }
    case 1: {
      return "ett";
    }
    case 2: {
      return "to";
    }
    case 3: {
      return "tre";
    }
    case 4: {
      return "fire";
    }
    case 5: {
      return "fem";
    }
    case 6: {
      return "seks";
    }
    case 7: {
      return "syv";
    }
    case 8: {
      return "åtte";
    }
    case 9: {
      return "ni";
    }
    case 10: {
      return "t1";
    }
    case 11: {
      return "elleve";
    }
    case 12: {
      return "tolv";
    }
    default: {
      return tall;
    }
  }
};

export const pad = (nr) => {
  return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

export const dagensDatoKortFormat = () => {
  const d = new Date();
  const dag = pad(d.getDate());
  const maned = pad(d.getMonth() + 1);
  return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getDatoFraZulu = (zulutid) => {
  const d = new Date(zulutid);
  const dag = pad(d.getDate());
  const maned = pad(d.getMonth() + 1);
  return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getTidFraZulu = (zulutid) => {
  const d = new Date(zulutid);
  return `${getDatoFraZulu(zulutid)} kl. ${pad(d.getHours())}.${pad(
    d.getMinutes()
  )}`;
};

export const finnVirksomhet = (leder) => {
  if (leder?.virksomhet) {
    return leder.virksomhet;
  } else if (leder?.orgnummer) {
    return "Henter virksomhet...";
  }
  return "Fant ikke virksomheten";
};

export const finnNavn = (bruker) => {
  if (bruker?.navn && bruker.fnr) {
    return (
      <a className="lenke" href={syfomodiapersonMoterUrl(bruker.fnr)}>
        {bruker.navn}
      </a>
    );
  } else if (!bruker?.fnr || !bruker?.navn) {
    return "Henter navn...";
  }
  return "Fant ikke navn";
};

export const finnVeilederNavn = (veileder) => {
  if (veileder?.navn) {
    return veileder.navn;
  } else if (veileder?.henter) {
    return "Henter navn...";
  }
  return "Fant ikke navn";
};

export const finnMiljoStreng = () => {
  const host = window.location.host;
  const bindestrekIndex = host.indexOf("-");
  if (bindestrekIndex === -1) {
    return "";
  }
  const dotIndex = host.indexOf(".");
  return host.substring(bindestrekIndex, dotIndex);
};
