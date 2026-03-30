import { HttpHandler, WebSocketHandler, ws } from "msw";
import { mockDialogmoter } from "@/mocks/mockDialogmoter";
import { mockSyfoveileder } from "@/mocks/mockSyfoveileder";
import mockEreg from "@/mocks/mockEreg";
import { mockModiacontextholder } from "@/mocks/mockModiacontextholder";
import mockSyfoperson from "@/mocks/mockSyfoperson";

const handlers: Array<HttpHandler | WebSocketHandler> = [
  ws.link("ws://localhost:4000/*").addEventListener("connection", () => {
    // Silently ignore WebSocket connections to Internflatedecorator in local development
  }),
  mockEreg,
  mockSyfoperson,
  ...mockModiacontextholder,
  ...mockSyfoveileder,
  ...mockDialogmoter,
];

export default handlers;
