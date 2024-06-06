import React from "react";
import { describe, it, expect } from "vitest";
import NavigasjonsTopp from "../../src/components/NavigasjonsTopp";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("NavigasjonsTopp", () => {
  it("Viser tre stk lenker dersom man sender inn 3 lenker", () => {
    const lenker = [
      {
        tittel: "tittel1",
        url: "/url1",
        aktiv: false,
      },
      {
        tittel: "tittel2",
        url: "/url2",
        aktiv: false,
      },
      {
        tittel: "tittel3",
        url: "/url3",
        aktiv: false,
      },
    ];
    render(
      <MemoryRouter>
        <NavigasjonsTopp lenker={lenker} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("link")).to.have.length(3);
  });
});
