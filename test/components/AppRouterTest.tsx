import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppRouter, { mineMoterRoutePath } from "@/routers/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockSetAktivEnhet = vi.fn();
const queryClient = new QueryClient();

vi.mock("@/context/aktivEnhet/AktivEnhetContext", async () => ({
  AktivEnhetContext: React.createContext(undefined),
  AktivEnhetProvider: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
  useAktivEnhet: () => ({
    aktivEnhet: "0314",
    setAktivEnhet: mockSetAktivEnhet,
  }),
}));

describe("AppRouter", () => {
  beforeEach(() => {
    mockSetAktivEnhet.mockClear();
    window.history.pushState({}, "", mineMoterRoutePath);
  });

  it("Decorator aktivEnhet endres ikke ved bytte til enhetensmoter", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Mine møter")).to.exist;
    mockSetAktivEnhet.mockClear();

    const enhetensMoterTab = screen.getByText("Enhetens møter");
    fireEvent.click(enhetensMoterTab);

    expect(screen.getByText("Enhetens møter")).to.exist;
    expect(mockSetAktivEnhet).not.to.have.been.called;
  });
});
