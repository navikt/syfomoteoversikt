import { minutesToMillis } from "@/utils/timeUtils";
import { expect } from "chai";

describe("timeUtils minutesToMillis", () => {
  it("returnerer 120000 millisekunder når input er 2 minutter", () => {
    const millis = minutesToMillis(2);
    expect(millis).to.equal(120000);
  });
});
