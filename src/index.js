import { render } from "react-dom";
import React from "react";
import AppRouter from "./routers/AppRouter";
import "./utils/globals";
import "./styles/styles.less";
import { initAmplitude } from "./amplitude/amplitude";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MoteoverforingProvider } from "@/context/moteoverforing/MoteoverforingContext";
import { AktivEnhetProvider } from "@/context/aktivEnhet/AktivEnhetContext";

initAmplitude();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

render(
  <AktivEnhetProvider>
    <MoteoverforingProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MoteoverforingProvider>
  </AktivEnhetProvider>,
  document.getElementById("maincontent")
);
