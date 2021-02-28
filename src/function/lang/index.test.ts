import { castArray, clone, cloneDeep } from ".";

describe("lang", () => {
  describe("castArray", () => {
    test("number", () => {
      expect(castArray(1)).toEqual([1]);
    });
    test("object", () => {
      expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
    });
    test("string", () => {
      expect(castArray("abc")).toEqual(["abc"]);
    });
    test("null", () => {
      expect(castArray(null)).toEqual([null]);
    });
    test("undefined", () => {
      expect(castArray(undefined)).toEqual([undefined]);
    });
    test("not args", () => {
      expect(castArray()).toEqual([]);
    });
    test("one reference because arg is array", () => {
      const array = [1, 2, 3];
      expect(castArray(array)).toBe(array);
      expect(castArray(array) === array).toBeTrue();
    });
  });

  describe("clone", () => {
    it("shallow clone", () => {
      const objects = [{ a: 1 }, { b: 2 }];

      const shallow = clone(objects);
      expect(objects[0] === shallow[0]).toBeTrue();
    });
  });
  describe("clone deep", () => {
    it("shallow clone", () => {
      const objects = [{ a: 1 }, { b: 2 }];

      const shallow = cloneDeep(objects);
      expect(objects[0] === shallow[0]).toBeFalse();
    });
  });
  describe('clone deep with', () => {
    
  })
  
});





















