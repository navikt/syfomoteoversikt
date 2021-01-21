import { expect } from "chai";
import { hentBruker } from "../../../src/data/bruker/brukerSagas";
import { get } from "../../../src/api";
import { put, call } from "redux-saga/effects";

describe("brukerSagas", () => {
  beforeEach(() => {
    window.APP_SETTINGS = {
      REST_ROOT: "/syfomoteadmin/api/internad",
    };
  });

  const generator = hentBruker({
    ident: "55",
    moteUuid: "moteUuid",
  });

  it("Skal dispatche HENTER_BRUKER", () => {
    const nextPut = put({ type: "HENTER_BRUKER" });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it("Skal dernest hente bruker", () => {
    const nextCall = call(get, "/syfomoteadmin/api/internad/brukerinfo/55");
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it("Skal dernest dispatche BRUKER_HENTET", () => {
    const nextPut = put({
      type: "BRUKER_HENTET",
      moteUuid: "moteUuid",
      data: {
        navn: "Berit",
      },
    });
    expect(
      generator.next({
        navn: "Berit",
      }).value
    ).to.deep.equal(nextPut);
  });
});
