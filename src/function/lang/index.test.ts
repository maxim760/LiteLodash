import {
  castArray,
  clone,
  cloneDeep,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  gt,
  eq,
  gte,
  isElement,
  isEmpty,
  isEqual,
  isArguments,
  isArray,
  isArrayBuffer,
  isBoolean,
  isDate,
  conformsTo,
} from ".";
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
  describe("conformsTo", () => {
    var object = { a: 1, b: 2 };

    it("falsey func", () => {
      expect(
        conformsTo(object, {
          b: function (n: any) {
            return n > 2;
          },
        })
      ).toBeFalse();
    });
    it("true func", () => {
      expect(
        conformsTo(object, {
          b: function (n: any) {
            return n > 1;
          },
        })
      ).toBeTrue();
    });
  });
  describe("eq", () => {
    var object = { a: 1 };
    var other = { a: 1 };
    it("object one ref", () => {
      expect(eq(object, object)).toBeTrue();
    });
    it("different object", () => {
      expect(eq(object, other)).toBeFalse();
    });
    it("string", () => {
      expect(eq("a", "a")).toBeTrue();
    });
    it("string and object string", () => {
      expect(eq("a", Object("a"))).toBeFalse();
    });
    it("nan", () => {
      expect(eq(NaN, NaN)).toBeTrue();
    });
  });
  describe("gt", () => {
    it("gt test", () => {
      expect(gt(3, 1)).toBeTrue();

      expect(gt(3, 3)).toBeFalse();
      expect(gt(1, 3)).toBeFalse();
    });
  });
  describe("gte", () => {
    it("gte test", () => {
      expect(gte(3, 1)).toBeTrue();
      // => true

      expect(gte(3, 3)).toBeTrue();
      // => true

      expect(gte(1, 3)).toBeFalse();
      // => false
    });
  });
  describe("isArguments", () => {
    it("array", () => {
      expect(
        isArguments(
          (function () {
            return arguments;
          })()
        )
      ).toBeTrue();
    });
    it("arguments", () => {
      expect(isArguments([1, 2, 3])).toBeFalse();
    });
  });
  describe("isArray", () => {
    it("array", () => {
      expect(isArray([1, 2, 3])).toBeTrue();
    });
    it("children", () => {
      expect(isArray(document.body.children)).toBeFalse();
    });
    it("string", () => {
      expect(isArray("abc")).toBeFalse();
    });
    it("null", () => {
      expect(isArray("abc")).toBeFalse;
    });
  });
  describe("isArrayBuffer", () => {
    it("array", () => {
      expect(isArrayBuffer([1, 2, 3])).toBeFalse();
      expect(isArrayBuffer(new Array(2))).toBeFalse();
    });
    it("arrayBuffer", () => {
      expect(isArrayBuffer(new ArrayBuffer(2))).toBeTrue();
    });
  });
  describe("isArrayLike", () => {
    it("array", () => {
      expect(isArrayLike([1, 2, 3])).toBeTrue();
    });
    it("set", () => {
      expect(isArrayLike(new Set([1,2,3,1,2,3]))).toBeTrue();
    });
    it("children", () => {
      expect(isArrayLike(document.body.children)).toBeTrue();
    });
    it("string", () => {
      expect(isArrayLike("abc")).toBeTrue();
    });
    it("null", () => {
      expect(isArrayLike("abc")).toBeFalse;
    });
  });
  describe("isArrayLikeObject", () => {
    it("array", () => {
      expect(isArrayLikeObject([1, 2, 3])).toBeTrue();
    });
    it("set", () => {
      expect(isArrayLikeObject(new Set([1,2,3,1,2,3]))).toBeTrue();
    });
    it("string", () => {
      expect(isArrayLikeObject("abc")).toBeFalse();
    });
    it("null", () => {
      expect(isArrayLikeObject("abc")).toBeFalse;
    });
  });
  describe("isBoolean", () => {
    it("boolean", () => {
      expect(isBoolean(true)).toBeTrue();
      expect(isBoolean(false)).toBeTrue();
    });
    it("not boolean", () => {
      expect(isBoolean("true")).toBeFalse();
      expect(isBoolean(123)).toBeFalse();
      expect(isBoolean([])).toBeFalse();
      expect(isBoolean({})).toBeFalse();
      expect(isBoolean(NaN)).toBeFalse();
      expect(isBoolean(null)).toBeFalse();
    });
  });
  describe("isBuffer", () => {
    it("buffer", () => {
      expect(isBuffer(new Buffer(2))).toBeTrue();
    });
    it("not buffer", () => {
      expect(isBuffer(new Uint16Array())).toBeFalse();
      expect(isBuffer(new Uint32Array())).toBeFalse();
      expect(isBuffer(new Uint8ClampedArray())).toBeFalse();
      expect(isBuffer(new Array(3))).toBeFalse();
      expect(isBuffer(new ArrayBuffer(2))).toBeFalse();
    });
    describe("isDate", () => {
      it("date", () => {
        expect(isDate(new Date())).toBeTrue();
      });
      it("string", () => {
        expect(isDate("Mon April 23 2012")).toBeFalse();
      });
    });
    describe("isElement", () => {
      it("success", () => {
        expect(isElement(document.body)).toBeTrue();
      });
      it("fail", () => {
        expect(isElement("<body>")).toBeFalse();
      });
    });
    describe("isEmpty", () => {
      it("null", () => {
        expect(isEmpty(null)).toBeTrue();
      });
      it("number", () => {
        expect(isEmpty(122)).toBeTrue();
        expect(isEmpty(0)).toBeTrue();
        expect(isEmpty(-99)).toBeTrue();
      });
      it("boolean", () => {
        expect(isEmpty(false)).toBeTrue();
        expect(isEmpty(true)).toBeTrue();
      });
      it("array", () => {
        expect(isEmpty([{}])).toBeFalse();
        expect(isEmpty([1, 2, 3])).toBeFalse();
      });
      it("empty array", () => {
        expect(isEmpty([])).toBeTrue();
      });
      it("object", () => {
        expect(isEmpty({ a: 1 })).toBeFalse();
      });
      it("empty object", () => {
        expect(isEmpty({})).toBeTrue();
      });
    });
    describe("isEqual", () => {
      var object = { a: 1 };
      var other = { a: 1 };

      it("success equal compare", () => {
        expect(isEqual(object, other)).toBeTrue();
      });
    });
  });
});
