import { expect } from "chai";
import { hentEnhetsMoter } from "../../../src/data/moter/moterEnhetSagas";
import { get } from "../../../src/api";
import { put, call } from "redux-saga/effects";
import { SYFOMOTEADMIN_ROOT } from "../../../src/utils/apiUrlUtil";

describe("enhetMoterSagas", () => {
  const generator = hentEnhetsMoter({
    type: "HENT_ENHETSMOTER",
    enhet: "0001",
  });

  it("Skal dispatche HENTER_ENHETSMOTER", () => {
    const nextPut = put({ type: "HENTER_ENHETSMOTER", enhet: "0001" });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it("Skal dernest hente enhets moter", () => {
    const nextCall = call(get, `${SYFOMOTEADMIN_ROOT}/v2/moter?navenhet=0001`);
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it("Skal dernest dispatche ENHETSMOTER_HENTET", () => {
    const nextPut = put({
      type: "ENHETSMOTER_HENTET",
      data: [],
    });
    expect(generator.next([]).value).to.deep.equal(nextPut);
  });
});
