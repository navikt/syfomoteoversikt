export const erProd = (): boolean => {
  return window.location.href.indexOf("nais.adeo.no") > -1;
};

export const erPreProd = (): boolean => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const erLokal = (): boolean => {
  return window.location.host.indexOf("localhost") > -1;
};

export const finnNaisUrlDefault = (): string => {
  return erPreProd() ? ".nais.preprod.local" : ".nais.adeo.no";
};

export const fullNaisUrlDefault = (host: string, path: string): string => {
  if (erLokal()) {
    return `http://localhost:8081${path}`;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};