import { expect } from "chai";
import { hentVirksomhet } from "@/data/virksomhet/virksomhetSagas";
import { get } from "@/api";
import { put, call } from "redux-saga/effects";
import {
  HENTER_VIRKSOMHET,
  VIRKSOMHET_HENTET,
} from "@/data/virksomhet/virksomhet_actions";

describe("virksomhetSagas", () => {
  const generator = hentVirksomhet({
    orgnummer: "55",
    type: "HENT_VIRKSOMHET_FORESPURT",
    moteUuid: "moteUuid",
  });

  it(`Skal dispatche ${HENTER_VIRKSOMHET}`, () => {
    const nextPut = put({ type: HENTER_VIRKSOMHET });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it("Skal dernest hente virksomhet", () => {
    const nextCall = call(get, "/syfomoteadmin/api/internad/v2/virksomhet/55");
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it(`Skal dernest dispatche ${VIRKSOMHET_HENTET}`, () => {
    const nextPut = put({
      type: VIRKSOMHET_HENTET,
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
