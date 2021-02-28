import { now } from ".";

describe("date", () => {
  describe("now", () => {
    it("return Date.now ", () => {
      // так как now здесь в разное время срабатывает то может быть погрешность в 1 секунду
      expect(now()).toBeCloseTo(Date.now(), -1);
    });
    it("return number ", () => {
      expect(now()).toBeNumber();
    });
  });
});
