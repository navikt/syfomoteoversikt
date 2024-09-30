import { SYFOPERSON_ROOT } from "@/utils/apiUrlUtil";
import { brukernavnMock } from "./data";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

export const stubBrukernavnApi = () => {
  mockServer.use(
    http.get(`*${SYFOPERSON_ROOT}/person/navn`, () =>
      HttpResponse.json(brukernavnMock)
    )
  );
};
