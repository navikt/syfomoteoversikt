import React from "react";
import { expect } from "chai";
import NavigasjonsTopp from "../../src/components/NavigasjonsTopp";
import { render } from "@testing-library/react";
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
    const wrapper = render(
      <MemoryRouter>
        <NavigasjonsTopp lenker={lenker} />
      </MemoryRouter>
    );
    expect(wrapper.getAllByRole("link")).to.have.length(3);
  });

  it("Viser lenke som aktiv", () => {
    const lenker = [
      {
        tittel: "tittel1",
        url: "/url1",
        aktiv: true,
      },
    ];
    const wrapper = render(
      <MemoryRouter>
        <NavigasjonsTopp lenker={lenker} />
      </MemoryRouter>
    );
    expect(wrapper.getByRole("link").className).to.equal(
      "navigasjon__element__inner--active"
    );
  });

  it("Viser lenke som ikke aktiv", () => {
    const lenker = [
      {
        tittel: "tittel1",
        url: "/url1",
        aktiv: false,
      },
    ];
    const wrapper = render(
      <MemoryRouter>
        <NavigasjonsTopp lenker={lenker} />
      </MemoryRouter>
    );
    expect(wrapper.getByRole("link").className).to.equal(
      "navigasjon__element__inner"
    );
  });
});
