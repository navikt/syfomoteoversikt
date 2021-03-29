import { Error403 } from "./errors";
import { erProd } from "../utils/miljoUtil";

const log = (message?: unknown, ...optionalParams: unknown[]) => {
  if (
    window.location.search.indexOf("log=true") > -1 ||
    process.env.NODE_ENV === "development"
  ) {
    console.log(message, optionalParams);
  }
};

export const getCookie = (name: string): string => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : "";
};

export const hentLoginUrl = (): string => {
  if (erProd()) {
    return "https://loginservice.nais.adeo.no/login";
  }
  return "https://loginservice.nais.preprod.local/login";
};

export const hentRedirectBaseUrl = (): string => {
  if (erProd()) {
    return "https://syfomoteoversikt.nais.adeo.no";
  }
  return "https://syfomoteoversikt.nais.preprod.local";
};

export const lagreRedirectUrlILocalStorage = (href: string): void => {
  localStorage.setItem("redirecturl", href);
};

export function get<T>(url: string): Promise<T> {
  return fetch(url, {
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
      }
      if (res.status === 404) {
        log(res);
        throw new Error("404");
      }
      if (res.status > 400 && res.status !== 403) {
        throw new Error("Det oppstod en feil");
      }
      return res.json().then((data) => {
        if (res.status === 403) {
          throw new Error403("403", data.harTilgang, data.begrunnelse);
        }
        return data as T;
      });
    })
    .catch((err) => {
      log(err);
      throw err;
    });
}

export function post<T>(url: string, body: T): Promise<unknown> {
  return fetch(url, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
    },
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
      }
      if (res.status > 400) {
        log(res);
        throw new Error("Forespørsel feilet");
      } else {
        return res;
      }
    })
    .catch((err) => {
      log(err);
      throw err;
    });
}
