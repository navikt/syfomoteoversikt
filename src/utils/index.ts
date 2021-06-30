export const tallOrdFraTall = (tall: number): string | number => {
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

export const pad = (nr: number): number | string => {
  return nr > 9 || nr.toString().length > 1 ? nr : `0${nr}`;
};

export const dagensDatoKortFormat = (): string => {
  const d = new Date();
  const dag = pad(d.getDate());
  const maned = pad(d.getMonth() + 1);
  return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getDatoFraZulu = (zulutid: Date): string => {
  const d = new Date(zulutid);
  const dag = pad(d.getDate());
  const maned = pad(d.getMonth() + 1);
  return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getTidFraZulu = (zulutid: Date): string => {
  const d = new Date(zulutid);
  return `${getDatoFraZulu(zulutid)} kl. ${pad(d.getHours())}.${pad(
    d.getMinutes()
  )}`;
};

export const finnMiljoStreng = (): string => {
  const host = window.location.host;
  const bindestrekIndex = host.indexOf("-");
  if (bindestrekIndex === -1) {
    return "";
  }
  const dotIndex = host.indexOf(".");
  return host.substring(bindestrekIndex, dotIndex);
};
