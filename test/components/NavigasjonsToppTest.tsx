import React from "react";
import { describe, it, expect } from "vitest";
import NavigasjonsTopp from "../../src/components/NavigasjonsTopp";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("NavigasjonsTopp", () => {
  it("Viser lenker", () => {
    render(
      <MemoryRouter>
        <NavigasjonsTopp />
      </MemoryRouter>
    );
    expect(screen.getByText("Min oversikt")).to.exist;
    expect(screen.getByText("Enhetens oversikt")).to.exist;
    expect(screen.getByText("Mine møter")).to.exist;
    expect(screen.getByText("Enhetens møter")).to.exist;
    expect(screen.getByText("Søk etter sykmeldt")).to.exist;
  });
});
