import { HttpHandler } from "msw";
import { mockDialogmoter } from "@/mocks/mockDialogmoter";
import { mockSyfoveileder } from "@/mocks/mockSyfoveileder";
import mockEreg from "@/mocks/mockEreg";
import { mockModiacontextholder } from "@/mocks/mockModiacontextholder";
import mockSyfoperson from "@/mocks/mockSyfoperson";

const handlers: HttpHandler[] = [
  mockEreg,
  mockSyfoperson,
  ...mockModiacontextholder,
  ...mockSyfoveileder,
  ...mockDialogmoter,
];

export default handlers;
