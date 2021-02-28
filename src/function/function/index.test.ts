import {
  after,
  ary,
  before,
  bind,
  bindKey,
  curry,
  curryRight,
  flip,
  negate,
  once,
  overArgs,
  partial,
  partialRight,
} from ".";

describe("function", () => {
  describe("after", () => {
    it("every call function , n = 0 ", () => {
      const done = after(0, () => 1);
      expect(done()).toBe(1);
      expect(done()).toBe(1);
    });
    it("every call function , n = 1 ", () => {
      const done = after(1, () => 1);
      expect(done()).toBe(1);
      expect(done()).toBe(1);
    });
    it("function in progress in 3 call and after ", () => {
      const done = after(3, () => 1);
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
      expect(done()).toBe(1);
      expect(done()).toBe(1);
      expect(done()).toBe(1);
    });
    it("function in progress in 10 calls and after ", () => {
      const done = after(10, () => 1);
      // первые 9 раз
      for (let i = 1; i < 10; i++) {
        expect(done()).toBeUndefined();
      }
      expect(done()).toBe(1);
      expect(done()).toBe(1);
    });
  });
  describe("before", () => {
    it("not call function , n = 0 ", () => {
      const done = before(0, () => 50);
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
    });
    it("not call function , n = 1 ", () => {
      const done = before(1, () => 50);
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
    });
    it("function in progress before 4 calls ", () => {
      const done = before(4, () => 50);
      expect(done()).toBe(50);
      expect(done()).toBe(50);
      expect(done()).toBe(50);
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
    });
    it("function in progress before 10 calls ", () => {
      const done = before(10, () => 50);
      // первые 9 раз
      for (let i = 1; i < 10; i++) {
        expect(done()).toBe(50);
      }
      expect(done()).toBeUndefined();
      expect(done()).toBeUndefined();
    });
  });

  describe("ary", () => {
    test("return undefined because amount args is limited", () => {
      const func = ary(2, (a: any, b: any, c: any) => c); // должно всегда быть undefned
      //@ts-ignore
      expect(func(1, 2, 3)).toBeUndefined();
      //@ts-ignore
      expect(func(1)).toBeUndefined();
      //@ts-ignore
      expect(func(1, 2, true, 44, 44)).toBeUndefined();
      //@ts-ignore
      expect(func([1, 2, 3, 4], 4, 4, 3, [3, 4], 66)).toBeUndefined();
    });
    test("max with limited args", () => {
      const func = ary(4, (...args: any) => Math.max(...args));
      expect(func(7, 6, 5, 3, 2, 1)).toBe(7);
      expect(func(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(4);
      expect(func(55, 55, 44, 33, 57, 999999)).toBe(55);
      expect(func(88)).toBe(88);
      expect(func(88, 121, 33)).toBe(121);
    });
    test("sum with limited args", () => {
      const func = ary(4, (...args: number[]) =>
        args.reduce((acc, value) => (acc += value), 0)
      );
      expect(func()).toBe(0);
      expect(func(1, 2, 3, 4)).toBe(10);
      expect(func(1, 2, 3, 4, 5)).toBe(10);
      expect(func(1, 2, 3, 4, 5, 6)).toBe(10);
      expect(func(0, 0, 0, 6, 3)).toBe(6);
      expect(func(33, 17, 1)).toBe(51);
      expect(func(0, 2, 0, -1)).toBe(1);
    });
  });
  describe("bind", () => {
    function greet(greeting: any, punctuation: any) {
      //@ts-ignore
      return greeting + " " + this.user + punctuation;
    }

    const object = { user: "fred" };
    test("bind object and one arg in call func", () => {
      const bound = bind(greet, object, "hi");
      expect(bound("!")).toBe("hi fred!");
      // => 'hi fred!'
    });
    test("bind object and 0 arg in call, all args on inizialization", () => {
      const bound = bind(greet, object, "allo", "!");
      expect(bound("hi", "max", "?", { user: "kek" })).toBe("allo fred!");
      // => 'hi fred!'
    });
  });
  describe("bindKey", () => {
    const object = {
      user: "fred",
      greet: function (greeting: any, punctuation: any) {
        return greeting + " " + this.user + punctuation;
      },
    };
    test("bind object and one arg in call func", () => {
      const bound = bindKey(object, "greet", "hi");
      expect(bound("!")).toBe("hi fred!");
      // => 'hi fred!'
    });
    test("bind object and 0 arg in call, all args on inizialization", () => {
      const bound = bindKey(object, "greet", "allo", "!");
      expect(bound("hi", "max", "?", { user: "kek" })).toBe("allo fred!");
      // => 'hi fred!'
    });
    test("bind object other func", () => {
      object.greet = function (greeting, punctuation) {
        return greeting + "ya " + this.user + punctuation;
      };
      const bound = bindKey(object, "greet", "hi");
      expect(bound("?")).toBe("hiya fred?");
      // => 'hi fred!'
    });
  });

  describe("curry", () => {
    const abc = function (a: any, b: any, c: any) {
      return [a, b, c];
    };
    //@ts-ignore
    const curried: any = curry(abc);

    test("diffferent curried", () => {
      expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
      expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
      expect(curried(1)(2, 3)).toEqual([1, 2, 3]);
      expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
    });
    test("error, more args ", () => {
      try {
        const res = curried(1)(2)(3)(4);
      } catch (error) {
        expect(error).not.toBeNil;
      }
      try {
        const res = curried(1)(2, 3)(4);
      } catch (error) {
        expect(error).not.toBeNil;
      }
    });
  });
  describe("curryRight", () => {
    const abc = function (a: any, b: any, c: any) {
      return [a, b, c];
    };
    //@ts-ignore
    const curried: any = curryRight(abc);

    test("diffferent curried", () => {
      expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
      expect(curried(2, 3)(1)).toEqual([1, 2, 3]);
      expect(curried(3)(1, 2)).toEqual([1, 2, 3]);
      expect(curried(3)(2)(1)).toEqual([1, 2, 3]);
    });
    test("error, more args ", () => {
      try {
        const res = curried(1)(2)(3)(4);
      } catch (error) {
        expect(error).not.toBeNil;
      }
      try {
        const res = curried(1)(2, 3)(4);
      } catch (error) {
        expect(error).not.toBeNil;
      }
    });
  });
  describe("flip", () => {
    test("should revers args", () => {
      const flipped = flip((...args: any[]) => [...args]);
      expect(flipped("a", "b", "c", "d")).toEqual(["d", "c", "b", "a"]);
    });
  });

  describe("negate", () => {
    function isEven(n: number) {
      return n % 2 == 0;
    }
    test("filter negate", () => {
      expect([1, 2, 3, 4, 5, 6].filter(negate(isEven))).toEqual([1, 3, 5]);
    });
  });

  describe("once", () => {
    test("return ever", () => {
      const getNum = (x: number) => x;
      const onced = once(getNum);
      expect(onced(4)).toBe(4);
      expect(onced(0)).toBe(4);
      expect(onced(3)).toBe(4);
      expect(onced(17)).toBe(4);
    });
    test("functional once", () => {
      const arr: any[] = [];
      function pushAr() {
        arr.push(1);
      }

      const onced = once(pushAr);
      onced();
      onced();
      onced();
      onced();
      expect(arr).toEqual([1]);
      expect(arr).toBeArrayOfSize(1);
    });
  });

  describe("overArgs", () => {
    function doubled(n: any) {
      return n * 2;
    }
    function square(n: any) {
      return n * n;
    }
    test("return arr and arr in deps", () => {
      const func = overArgs(
        function (x: any, y: any) {
          return [x, y];
        },
        [square, doubled]
      );
      expect(func(9, 3)).toEqual([81, 6]);
    });
    test("return arr and not arr in deps", () => {
      const func = overArgs(function (x: any, y: any) {
        return [x, y];
      }, square);
      expect(func(9, 3)).toEqual([81, 9]);
    });
    test("return arr and arr length 1 in deps", () => {
      const func = overArgs(
        function (x: any, y: any) {
          return [x, y];
        },
        [square]
      );
      expect(func(9, 3)).toEqual([81, 9]);
    });
    test("return not arr and arr length 1 in deps", () => {
      const func = overArgs(
        function (x: any) {
          return x;
        },
        [square]
      );
      expect(func(9, 3)).toEqual(81);
    });
    test("return  arr lenght 1 and arr length 1 in deps", () => {
      const func = overArgs(
        function (x: any) {
          return [x];
        },
        [doubled]
      );
      expect(func(9, 3)).toEqual([18]);
    });
  });

  describe("partial", () => {
    function greet(greeting: any, name: any) {
      return greeting + " " + name;
    }
    it("one arg on call", () => {
      const sayHelloTo = partial(greet, "hello");
      expect(sayHelloTo("fred")).toBe("hello fred");
    });
    it("all args on inizialization", () => {
      const sayHelloTo = partial(greet, "React", "Vue");
      expect(sayHelloTo("Svelte", "Angular")).toBe("React Vue");
    });
  });
  describe("partialRight", () => {
    function greet(greeting: any, name: any) {
      return greeting + " " + name;
    }
    it("one arg on call", () => {
      const sayHelloTo = partialRight(greet, "hello");
      expect(sayHelloTo("fred")).toBe("fred hello");
    });
    it("args on inizialization is ignore", () => {
      const sayHelloTo = partialRight(greet, "React", "Vue");
      expect(sayHelloTo("Svelte", "Angular")).toBe("Svelte Angular");
    });
  });
});
