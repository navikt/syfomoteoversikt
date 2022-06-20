const pad = (nr: number): number | string => {
  return nr > 9 || nr.toString().length > 1 ? nr : `0${nr}`;
};

export const dagensDatoKortFormat = (): string => getDatoFraZulu(new Date());

export const getDatoFraZulu = (zulutid: Date): string => {
  const d = new Date(zulutid);
  const dag = pad(d.getDate());
  const maned = pad(d.getMonth() + 1);
  const time = pad(d.getHours());
  const minutt = pad(d.getMinutes());
  return `${dag}.${maned}.${d.getFullYear()} kl. ${time}.${minutt}`;
};
