export const erPreProd = (): boolean => {
  return (
    window.location.href.indexOf("dev.intern.nav.no") > -1 ||
    window.location.href.indexOf("intern.dev.nav.no") > -1
  );
};

export const erLokal = (): boolean => {
  return window.location.host.indexOf("localhost") > -1;
};

export function erProd(): boolean {
  return window.location.href.indexOf("syfomoteoversikt.intern.nav.no") > -1;
}

const finnNaisUrlDefault = (): string => {
  return erPreProd() ? ".intern.dev.nav.no" : ".intern.nav.no";
};

export const fullNaisUrlDefault = (host: string, path: string): string => {
  if (erLokal()) {
    return `http://localhost:8081${path}`;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};
