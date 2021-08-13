import { expect } from "chai";
import { overforDialogmoter, overforMoter } from "@/data/overfor/overforSagas";
import { call, put } from "redux-saga/effects";
import { post } from "@/api";
import { ISDIALOGMOTE_ROOT, SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";

describe("overforSagas", () => {
  describe("overforMoter", () => {
    const generator = overforMoter({
      type: "OVERFOR_MOTER_FORESPURT",
      moteUuids: ["2"],
    });

    it("skal dispatche OVERFORER_MOTER", () => {
      const putOverforerMoter = put({ type: "OVERFORER_MOTER" });

      expect(generator.next().value).to.deep.equal(putOverforerMoter);
    });

    it("skal dernest overføre møter", () => {
      const callOverforMoter = call(
        post,
        `${SYFOMOTEADMIN_ROOT}/v2/actions/moter/overfor`,
        {
          moteUuidListe: ["2"],
        }
      );

      expect(generator.next().value).to.deep.equal(callOverforMoter);
    });

    it("skal derneste dispatche MOTER_OVERFORT og OVERFOR_MOTER_RESET", () => {
      const putMoterOverfort = put({ type: "MOTER_OVERFORT" });
      const putResetOverforing = put({ type: "OVERFOR_MOTER_RESET" });

      expect(generator.next().value).to.deep.equal(putMoterOverfort);
      expect(generator.next().value).to.deep.equal(putResetOverforing);
    });
  });

  describe("overforDialogmoter", () => {
    const generator = overforDialogmoter({
      type: "OVERFOR_DIALOGMOTER_FORESPURT",
      dialogmoteUuids: ["1"],
    });

    it("skal dispatche OVERFORER_DIALOGMOTER", () => {
      const putOverforerDialogmoter = put({ type: "OVERFORER_DIALOGMOTER" });

      expect(generator.next().value).to.deep.equal(putOverforerDialogmoter);
    });

    it("skal dernest overføre dialogmøter", () => {
      const callOvertaDialogmoter = call(
        post,
        `${ISDIALOGMOTE_ROOT}/v2/dialogmote/overta`,
        {
          dialogmoteUuids: ["1"],
        }
      );

      expect(generator.next().value).to.deep.equal(callOvertaDialogmoter);
    });

    it("skal derneste dispatche DIALOGMOTER_OVERFORT og OVERFOR_DIALOGMOTER_RESET", () => {
      const putDialogmoterOverfort = put({ type: "DIALOGMOTER_OVERFORT" });
      const putResetDialogmoteOverforing = put({
        type: "OVERFOR_DIALOGMOTER_RESET",
      });

      expect(generator.next().value).to.deep.equal(putDialogmoterOverfort);
      expect(generator.next().value).to.deep.equal(
        putResetDialogmoteOverforing
      );
    });
  });
});
