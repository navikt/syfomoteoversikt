import { getDatoFraZulu } from "../../src/utils/dateUtil";
import { DialogmoterDTO } from "../../src/data/dialogmoter/dialogmoterTypes";
import { getDialogmoteDato } from "../../src/utils/dialogmoterUtil";
import { expect } from "chai";

describe("dateUtil getDatoFraZulu", () => {
  it("viser riktig dato for dialogmøte", () => {
    let dialogmote = {
      tid: "2021-07-01T00:10:00",
    } as DialogmoterDTO;
    expect(getDatoFraZulu(getDialogmoteDato(dialogmote))).to.equal(
      "01.07.2021"
    );
    dialogmote = {
      tid: "2021-07-01T23:50:00",
    } as DialogmoterDTO;
    expect(getDatoFraZulu(getDialogmoteDato(dialogmote))).to.equal(
      "01.07.2021"
    );
    dialogmote = {
      tid: "2021-07-02T10:00:00",
    } as DialogmoterDTO;
    expect(getDatoFraZulu(getDialogmoteDato(dialogmote))).to.equal(
      "02.07.2021"
    );
  });
});
