import axios, { AxiosError } from "axios";
import {
  accessDeniedError,
  ApiErrorException,
  generalError,
  loginRequiredError,
  networkError,
} from "./errors";
import { generateUUID } from "../utils/uuidUtils";

export const NAV_CALL_ID_HEADER = "Nav-Call-Id";
export const NAV_CONSUMER_ID_HEADER = "Nav-Consumer-Id";
export const NAV_CONSUMER_ID = "syfomoteoversikt";
export const NAV_PERSONIDENT_HEADER = "nav-personident";

const defaultRequestHeaders = (
  personIdent?: string
): Record<string, string> => {
  const headers = {
    "Content-Type": "application/json",
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
    [NAV_CALL_ID_HEADER]: `${NAV_CONSUMER_ID}-${generateUUID()}`,
  };

  if (personIdent) {
    return {
      ...headers,
      [NAV_PERSONIDENT_HEADER]: personIdent,
    };
  } else {
    return headers;
  }
};

const getCookie = (name: string): string => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match?.[1] ?? "";
};

const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
        throw new ApiErrorException(
          loginRequiredError(error),
          error.response.status
        );
      }
      case 403: {
        throw new ApiErrorException(
          accessDeniedError(error),
          error.response.status
        );
      }
      default:
        throw new ApiErrorException(generalError(error), error.response.status);
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error));
  } else {
    throw new ApiErrorException(generalError(error));
  }
};

export const get = <ResponseData>(
  url: string,
  personIdent?: string
): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(personIdent),
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error), error.code);
      }
    });
};

export const post = <ResponseData>(
  url: string,
  data: ResponseData
): Promise<ResponseData> => {
  return axios
    .post(url, data, {
      headers: {
        ...defaultRequestHeaders(),
        NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
      },
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error), error.code);
      }
    });
};
