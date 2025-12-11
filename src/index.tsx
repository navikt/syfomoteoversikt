import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import "@navikt/ds-css";
import "./utils/globals";
import "./styles/styles.css";
import "./styles/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MoteoverforingProvider } from "@/context/moteoverforing/MoteoverforingContext";
import { AktivEnhetProvider } from "@/context/aktivEnhet/AktivEnhetContext";
import { minutesToMillis } from "@/utils/timeUtils";
import { isClientError } from "@/api/errors";
import { initFaro } from "@/faro";
import { erLokal, erProd } from "@/utils/miljoUtil";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "offlineFirst",
    },
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      gcTime: minutesToMillis(60),
      staleTime: minutesToMillis(30),
      retry: (failureCount, error) => {
        if (isClientError(error)) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

function addUmamiScript() {
  const dataWebsiteId = erProd()
    ? "19fa498f-4d3e-4ad5-b484-e16469cb569b"
    : "67e34db2-7797-4ff8-ac22-49cbce18fd69";
  const script = document.createElement("script");
  script.setAttribute("data-host-url", "https://umami.nav.no");
  script.setAttribute("data-website-id", dataWebsiteId);
  script.setAttribute(
    "src",
    "https://cdn.nav.no/team-researchops/sporing/sporing.js"
  );
  script.setAttribute("defer", "defer");
  document.head.appendChild(script);
}

initFaro();

const container =
  document.getElementById("maincontent") || new DocumentFragment();
const root = createRoot(container);

function renderApp() {
  if (!erLokal()) {
    addUmamiScript();
  }
  root.render(
    <AktivEnhetProvider>
      <MoteoverforingProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MoteoverforingProvider>
    </AktivEnhetProvider>
  );
}

async function setupMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

if (erLokal()) {
  setupMocking().then(() => renderApp());
} else {
  renderApp();
}
