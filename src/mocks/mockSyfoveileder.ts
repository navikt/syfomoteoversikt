import { veiledereMock } from "@/mocks/Data/veiledereMock";
import { http, HttpResponse } from "msw";

export const mockSyfoveileder = [
  http.get("/syfoveileder/api/v3/veiledere/self", () =>
    HttpResponse.json(veiledereMock[0])
  ),
  http.get<{ ident: string }>(
    "/syfoveileder/api/v3/veiledere/:ident",
    ({ params }) => {
      const veileder = veiledereMock.find((v) => v.ident === params.ident);
      return HttpResponse.json(veileder);
    }
  ),
  http.get("/syfoveileder/api/v3/veiledere", () =>
    HttpResponse.json(veiledereMock)
  ),
];
