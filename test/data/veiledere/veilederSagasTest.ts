import { expect } from "chai";
import { get } from "../../../src/api";
import { put, call } from "redux-saga/effects";
import { hentVeileder } from "../../../src/data/veiledere/veilederSagas";

describe("veilederSagas", () => {
  const generator = hentVeileder({
    type: "HENTER_VEILEDER",
    data: { ident: "Z999999" },
  });

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
    const nextCall = call(get, "/syfoveileder/api/v1/veileder/Z999999");
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
