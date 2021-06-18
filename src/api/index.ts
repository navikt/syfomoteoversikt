export const NAV_CONSUMER_ID_HEADER = "nav-consumer-id";
export const NAV_CONSUMER_ID = "syfomoteoversikt";

import { Error403 } from "./errors";

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

export function get<T>(url: string): Promise<T> {
  const headers = {
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
  };
  return fetch(url, {
    credentials: "include",
    headers,
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
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
  const headers = {
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
    "Content-Type": "application/json",
    NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
  };
  return fetch(url, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers,
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
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
