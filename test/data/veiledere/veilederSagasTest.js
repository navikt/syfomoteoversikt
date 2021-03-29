import { expect } from "chai";
import { hentVeileder } from "../../../src/data/veiledere/veilederSagas.ts";
import { get } from "../../../src/api";
import { put, call } from "redux-saga/effects";

describe("veilederSagas", () => {
  beforeEach(() => {
    window.APP_SETTINGS = {
      REST_ROOT: "/syfomoteadmin/api/internad",
    };
  });

  const generator = hentVeileder({ data: { ident: "Z999999" } });

  it("Skal dispatche HENTER_VEILEDER", () => {
    const nextPut = put({
      type: "HENTER_VEILEDER",
      data: {
        ident: "Z999999",
      },
    });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it("Skal dernest hente veileder", () => {
    const nextCall = call(
      get,
      "/syfomoteadmin/api/internad/veilederinfo/Z999999"
    );
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it("Skal dernest dispatche VEILEDER_HENTET", () => {
    const nextPut = put({
      type: "VEILEDER_HENTET",
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
