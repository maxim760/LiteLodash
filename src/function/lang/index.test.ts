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
  isNaN,
  isFinite,
  isEqualWith,
  isError,
  isFunction,
  isInteger,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNil,
  isNull,
  isNumber,
  isObject,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSageInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
  lt,
  lte,
  toArray,
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
      expect(isArrayLike(new Set([1, 2, 3, 1, 2, 3]))).toBeTrue();
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
      expect(isArrayLikeObject(new Set([1, 2, 3, 1, 2, 3]))).toBeTrue();
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
  describe("isEqualWith", () => {
    function isGreeting(value: any) {
      return /^h(?:i|ello)$/.test(value);
    }

    function customizer(objValue: any, othValue: any) {
      if (isGreeting(objValue) && isGreeting(othValue)) {
        return true;
      }
    }

    var array = ["hello", "goodbye"];
    var other = ["hi", "goodbye"];
    expect(isEqualWith(array, other, customizer)).toBeTrue;
    it("test isEqualWith", () => {});
  });
  describe("isError", () => {
    it("test isError", () => {
      expect(isError(new Error())).toBeTrue();
    });
    it("test not error ", () => {
      expect(isError(Error)).toBeFalse();
    });
    Number.MIN_VALUE;
  });
  describe("isFinite", () => {
    it("number integer", () => {
      expect(isFinite(3)).toBeTrue();
    });
    it(" min value", () => {
      expect(isFinite(Number.MIN_VALUE)).toBeTrue();
    });
    it(" infinity", () => {
      expect(isFinite(Infinity)).toBeFalse();
    });
    it("string", () => {
      expect(isFinite("3")).toBeFalse();
    });
  });
  describe("isFunction", () => {
    it("true", () => {
      expect(isFunction(() => 15)).toBeTrue();
    });
    it("fail", () => {
      expect(isFunction(/abc/)).toBeFalse();
    });
  });
  describe("isInteger", () => {
    it("success", () => {
      expect(isInteger(3)).toBeTrue();
      expect(isInteger(-3)).toBeTrue();
    });
    it("fail", () => {
      expect(isInteger(Number.MIN_VALUE)).toBeFalse();
      expect(isInteger(Infinity)).toBeFalse();
      expect(isInteger("3")).toBeFalse();
    });
  });
  describe("isLength", () => {
    it("success", () => {
      expect(isLength(3)).toBeTrue();
    });
    it("fail", () => {
      expect(isLength(-3)).toBeFalse();
      expect(isLength(Number.MIN_VALUE)).toBeFalse();
      expect(isLength(Infinity)).toBeFalse();
      expect(isLength("3")).toBeFalse();
    });
  });
  describe("isMap", () => {
    it("success", () => {
      expect(isMap(new Map())).toBeTrue();
    });
    it("fail", () => {
      expect(isMap(new WeakMap())).toBeFalse();
    });
  });
  describe("isMatch", () => {
    var object = { a: 1, b: 2 };
    var objectDeep = { 'a': 1, 'b': {c:3, d:{e:12}} };


    it("success", () => {
      expect(isMatch(object, { b: 2 })).toBeTrue();
    });
    it("successDeep", () => {
      expect(isMatch(objectDeep, { 'b': {c:3, d:{e:12}} })).toBeTrue();
    });
    it("fail", () => {
      expect(isMatch(object, { b: 1 })).toBeFalse();
    });
  });
  describe("isMatchWith", () => {
    function isGreeting(value: any) {
      return /^h(?:i|ello)$/.test(value);
    }

    function customizer(objValue: any, srcValue: any) {
      if (isGreeting(objValue) && isGreeting(srcValue)) {
        return true;
      }
    }

    var object = { greeting: "hello" };
    var source = { greeting: "hi" };
    var sourceFail = { greeting: "hihi" };

    it("success", () => {
      expect(isMatchWith(object, source, customizer)).toBeTrue();
    });
    it("fail", () => {
      expect(isMatchWith(object, sourceFail, customizer)).toBeFalse();
    });
  });
  describe("isNaN", () => {
    it("success", () => {
      expect(isNaN(NaN)).toBeTrue();
      expect(isNaN(new Number(NaN))).toBeTrue();
    });
    it("fail", () => {
      expect(isNaN(undefined)).toBeFalse();
    });
  });
  describe("isNil", () => {
    it("test isNil", () => {
      expect(isNil(null)).toBeTrue();
      expect(isNil(undefined)).toBeTrue();
      expect(isNil(void 0)).toBeTrue();
    });
    it("fail", () => {
      expect(isNil(NaN)).toBeFalse();
      expect(isNil(new Number(NaN))).toBeFalse();
      expect(isNil(false)).toBeFalse();
      expect(isNil(0)).toBeFalse();
    });
  });
  describe("isNull", () => {
    it("test isNull", () => {
      expect(isNull(null)).toBeTrue();
    });
    it("fail", () => {
      expect(isNull(undefined)).toBeFalse();
      expect(isNull(void 0)).toBeFalse();
      expect(isNull(NaN)).toBeFalse();
      expect(isNull(new Number(NaN))).toBeFalse();
      expect(isNull(false)).toBeFalse();
      expect(isNull(0)).toBeFalse();
    });
  });
  describe("isNumber", () => {
    it("test isNumber", () => {
      expect(isNumber(3)).toBeTrue();
      expect(isNumber(Number.MIN_VALUE)).toBeTrue();
      expect(isNumber(Infinity)).toBeTrue();
      expect(isNumber(-Infinity)).toBeTrue();
      expect(isNumber(0 / 0)).toBeTrue();
    });
    it("fail", () => {
      expect(isNumber("3")).toBeFalse();
    });
  });
  describe("isObject", () => {
    it("success", () => {
      expect(isObject({})).toBeTrue();
      expect(isObject([1, 2, 3])).toBeTrue();
      expect(isObject(() => undefined)).toBeTrue();
    });
    it("fail", () => {
      expect(isObject(null)).toBeFalse();
    });
  });
  describe("isObjectLike", () => {
    it("success", () => {
      expect(isObjectLike({})).toBeTrue();
      expect(isObjectLike([1, 2, 3])).toBeTrue();
    });
    it("fail", () => {
      expect(isObjectLike(() => undefined)).toBeFalse();
      expect(isObjectLike(null)).toBeFalse();
    });
  });
  describe("isPlainObject", () => {
    function Foo() {
      //@ts-ignore
      this.a = 1;
    }
    it("success", () => {
      expect(isPlainObject({ x: 0, y: 0 })).toBeTrue();
      expect(isPlainObject(Object.create(null))).toBeTrue();
    });
    it("fail", () => {
      //@ts-ignore
      expect(isPlainObject(new Foo)).toBeFalse();
      expect(isPlainObject([1, 2, 3])).toBeFalse();
      expect(isPlainObject(null)).toBeFalse();
    });
  });
  describe("isRegExp", () => {
    it("success", () => {
      expect(isRegExp(/abc/)).toBeTrue();
    });
    it("fail", () => {
      expect(isRegExp("/abc/")).toBeFalse();
    });
  });
  describe("isSageInteger", () => {
    it("success", () => {
      expect(isSageInteger(3)).toBeTrue();
    });
    it("fail", () => {
      expect(isSageInteger(Number.MAX_VALUE)).toBeFalse();
      expect(isSageInteger(Infinity)).toBeFalse();
      expect(isSageInteger("3")).toBeFalse();
    });
  });
  describe("isSet", () => {
    it("success", () => {
      expect(isSet(new Set())).toBeTrue();
    });
    it("fail", () => {
      expect(isSet(new WeakSet())).toBeFalse();
    });
  });
  describe("isString", () => {
    it("success", () => {
      expect(isString("abc")).toBeTrue();
    });
    it("fail", () => {
      expect(isString(1)).toBeFalse();
    });
  });
  describe("isSymbol", () => {
    it("success", () => {
      expect(isSymbol(Symbol.iterator)).toBeTrue();
    });
    it("fail", () => {
      expect(isSymbol("abc")).toBeFalse();
    });
  });
  describe("isTypedArray", () => {
    it("success", () => {
      expect(isTypedArray(new Uint8Array())).toBeTrue();
    });
    it("fail", () => {
      expect(isTypedArray([])).toBeFalse();
    });
  });
  describe("isUndefined", () => {
    it("success", () => {
      expect(isUndefined(void 0)).toBeTrue();
      expect(isUndefined(undefined)).toBeTrue();
    });
    it("fail", () => {
      expect(isUndefined(null)).toBeFalse();
    });
  });
  describe("isWeakMap", () => {
    it("success", () => {
      expect(isWeakMap(new WeakMap())).toBeTrue();
    });
    it("fail", () => {
      expect(isWeakMap(new Map())).toBeFalse();
    });
  });
  describe("isWeakSet", () => {
    it("success", () => {
      expect(isWeakSet(new WeakSet())).toBeTrue();
    });
    it("fail", () => {
      expect(isWeakSet(new Set())).toBeFalse();
    });
  });
  describe("lt", () => {
    it("success", () => {
      expect(lt(1, 3)).toBeTrue();
    });
    it("fail", () => {
      expect(lt(3, 3)).toBeFalse();
      expect(lt(3, 1)).toBeFalse();
    });
  });
  describe("lte", () => {
    it("success", () => {
      expect(lte(1, 3)).toBeTrue();
      expect(lte(3, 3)).toBeTrue();
    });
    it("fail", () => {
      expect(lte(3, 1)).toBeFalse();
    });
  });
  describe("toArray", () => {
    it("from object", () => {
      expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    });
    it("from empty object", () => {
      expect(toArray({})).toEqual([]);
    });
    it("from string", () => {
      expect(toArray("abc")).toEqual(["a", "b", "c"]);
    });
    it("from number", () => {
      expect(toArray(1)).toEqual([]);
    });
  });
});
