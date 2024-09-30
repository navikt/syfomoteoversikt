import { http, HttpHandler, HttpResponse } from "msw";
import { mockDialogmoter } from "@/mocks/mockDialogmoter";
import { mockSyfoveileder } from "@/mocks/mockSyfoveileder";
import mockEreg from "@/mocks/mockEreg";
import { mockModiacontextholder } from "@/mocks/mockModiacontextholder";
import mockSyfoperson from "@/mocks/mockSyfoperson";

const handlers: HttpHandler[] = [
  http.post("https://amplitude.nav.no/collect", () => HttpResponse.json({})),
  mockEreg,
  mockSyfoperson,
  ...mockModiacontextholder,
  ...mockSyfoveileder,
  ...mockDialogmoter,
];

export default handlers;
