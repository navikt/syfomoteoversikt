import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.css";
import "./styles/style.css";
import "@navikt/ds-css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MoteoverforingProvider } from "@/context/moteoverforing/MoteoverforingContext";
import { AktivEnhetProvider } from "@/context/aktivEnhet/AktivEnhetContext";
import { minutesToMillis } from "@/utils/timeUtils";
import { isClientError } from "@/api/errors";
import { initFaro } from "@/faro";
import { erLokal } from "@/utils/miljoUtil";

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

initFaro();

const container =
  document.getElementById("maincontent") || new DocumentFragment();
const root = createRoot(container);

function renderApp() {
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
