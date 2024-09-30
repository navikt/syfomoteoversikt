import { brukernavnMock } from "./Data/brukernavnMock";

import { SYFOPERSON_ROOT } from "@/utils/apiUrlUtil";
import { http, HttpResponse } from "msw";

const mockSyfoperson = http.get(`${SYFOPERSON_ROOT}/person/navn`, () =>
  HttpResponse.json(brukernavnMock)
);

export default mockSyfoperson;
