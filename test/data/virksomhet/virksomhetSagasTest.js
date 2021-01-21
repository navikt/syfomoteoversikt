import { expect } from "chai";
import { hentVirksomhet } from "../../../src/data/virksomhet/virksomhetSagas";
import { get } from "../../../src/api";
import { put, call } from "redux-saga/effects";

describe("virksomhetSagas", () => {
  beforeEach(() => {
    window.APP_SETTINGS = {
      REST_ROOT: "/syfomoteadmin/api/internad",
    };
  });

  const generator = hentVirksomhet({
    orgnummer: "55",
    moteUuid: "moteUuid",
  });

  it("Skal dispatche HENTER_VIRKSOMHET", () => {
    const nextPut = put({ type: "HENTER_VIRKSOMHET" });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it("Skal dernest hente virksomhet", () => {
    const nextCall = call(get, "/syfomoteadmin/api/internad/virksomhet/55");
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it("Skal dernest dispatche VIRKSOMHET_HENTET", () => {
    const nextPut = put({
      type: "VIRKSOMHET_HENTET",
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
