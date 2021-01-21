import { expect } from "chai";
import {
  aktivEnhetSaga,
  pushModiacontextSaga,
} from "../../../src/data/modiacontext/modiacontextSagas";
import {
  HENTER_AKTIVENHET,
  PUSHER_MODIACONTEXT,
} from "../../../src/data/modiacontext/modiacontext_actions";
import { get, post } from "../../../src/api";
import { put, call } from "redux-saga/effects";

describe("modiacontextSagas", () => {
  describe("aktivEnhetSaga", () => {
    const generator = aktivEnhetSaga();

    it("Skal dispatche HENTER_AKTIVENHET", () => {
      const nextPut = put({ type: HENTER_AKTIVENHET });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente aktiv enhet", () => {
      const nextCall = call(get, "/modiacontextholder/api/context/aktivenhet");
      expect(generator.next().value).to.deep.equal(nextCall);
    });
  });

  describe("pushModiacontextSaga", () => {
    const generator = pushModiacontextSaga({
      data: {
        verdi: "fnr",
        eventType: "event1",
      },
    });

    it("Skal dispatche PUSHER_MODIACONTEXT", () => {
      const nextPut = put({ type: PUSHER_MODIACONTEXT });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest pushe context", () => {
      const nextCall = call(post, "/modiacontextholder/api/context", {
        verdi: "fnr",
        eventType: "event1",
      });
      expect(generator.next().value).to.deep.equal(nextCall);
    });
  });
});
