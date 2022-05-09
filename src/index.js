import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.less";
import { initAmplitude } from "./amplitude/amplitude";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MoteoverforingProvider } from "@/context/moteoverforing/MoteoverforingContext";
import { AktivEnhetProvider } from "@/context/aktivEnhet/AktivEnhetContext";
import { minutesToMillis } from "@/utils/timeUtils";
import { isClientError } from "@/api/errors";

initAmplitude();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: minutesToMillis(60),
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

const container =
  document.getElementById("maincontent") || new DocumentFragment();
const root = createRoot(container);

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
