import { dialogmoterMock } from "@/mocks/Data/dialogmoterMock";
import { http, HttpResponse } from "msw";

export const mockDialogmoter = [
  http.get("/isdialogmote/api/v2/dialogmote/enhet/:enhetId", () =>
    HttpResponse.json(dialogmoterMock)
  ),

  http.get("/isdialogmote/api/v2/dialogmote/veilederident", () =>
    HttpResponse.json(dialogmoterMock)
  ),

  http.post("/isdialogmote/api/v2/dialogmote/overta", () =>
    HttpResponse.text("OK")
  ),

  http.patch("/isdialogmote/api/v2/dialogmote/tildel", () =>
    HttpResponse.text("OK")
  ),
];
