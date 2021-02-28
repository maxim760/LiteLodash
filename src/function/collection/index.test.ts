import {
  countBy,
  every,
  filter,
  find,
  findLast,
  flatMap,
  flatMapDeep,
  flatMapDepth,
  groupBy,
  includes,
  invokeMap,
  keyBy,
  map,
  orderBy,
  partition,
  reduce,
  reduceRight,
  reject,
  sample,
  sampleSize,
  shuffle,
  size,
  some,
  sortBy,
} from "./index";
describe("test collection", () => {
  describe("test countBy", () => {
    test("should return length from number", () => {
      expect(countBy([1, 33, 89, 177], "length")).toEqual({
        "1": 1,
        "2": 2,
        "3": 1,
      });
    });
    test("should return math floor numbers", () => {
      expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ "4": 1, "6": 2 });
    });
    test("should return length from string", () => {
      expect(countBy(["one", "two", "three"], "length")).toEqual({
        "3": 2,
        "5": 1,
      });
    });
  });
  describe("every", () => {
    const users = [
      { user: "barney", age: 36, active: false },
      { user: "fred", age: 40, active: false },
    ];
    const users2 = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: true },
    ];
    test("should return res if function", () => {
      expect(every([true, 1, null, "yes"], Boolean)).toEqual(false);
      expect(every([true, 1, [], "yes", {}], Boolean)).toEqual(true);
      expect(
        every([false, "", 0, undefined, null, NaN], (item: any) => !item)
      ).toEqual(true);
    });
    test("should return res if object", () => {
      expect(every(users, { user: "barney", active: false })).toEqual(false);
      expect(every(users, { user: "fred", age: 36 })).toEqual(false);
    });
    test("should return res if array", () => {
      expect(every(users, ["active", false])).toEqual(true);
      expect(every(users, ["age", 33])).toEqual(false);
    });
    test("should return res if string", () => {
      expect(every(users, "active")).toEqual(false);
      expect(every(users2, "active")).toEqual(true);
    });
  });

  describe("filter", () => {
    const users = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: false },
    ];
    test("should return res if function", () => {
      expect(
        filter(users, function (o: any) {
          return !o.active;
        })
      ).toEqual([{ user: "fred", age: 40, active: false }]);
    });
    test("should return res if object", () => {
      expect(filter(users, { age: 36, active: true })).toEqual([
        { user: "barney", age: 36, active: true },
      ]);
    });
    test("should return res if array", () => {
      expect(filter(users, ["active", false])).toEqual([
        { user: "fred", age: 40, active: false },
      ]);
    });
    test("should return res if string", () => {
      expect(filter(users, "active")).toEqual([
        { user: "barney", age: 36, active: true },
      ]);
    });
  });

  describe("find", () => {
    const users = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: false },
      { user: "pebbles", age: 1, active: true },
    ];

    test("should return res if function", () => {});
    test("should return res if function", () => {
      expect(
        find(users, function (o: any) {
          return o.age < 40;
        })
      ).toEqual(users[0]);
    });
    test("should return res if function and fromIndex", () => {
      expect(
        find(
          users,
          function (o: any) {
            return o.age < 40;
          },
          1
        )
      ).toEqual(users[2]);
    });
    test("should return res if object", () => {
      expect(find(users, { age: 1, active: true })).toEqual(users[2]);
    });

    test("should return res if array", () => {
      expect(find(users, ["active", false])).toEqual(users[1]);
    });
    test("should return res if string", () => {
      expect(find(users, "active")).toEqual(users[0]);
    });
  });
  describe("findLast", () => {
    test("should res", () => {
      expect(
        findLast([1, 2, 3, 4], function (n: any) {
          return n % 2 == 1;
        })
      ).toEqual(3);
    });
    test("should res with fromIndex", () => {
      expect(
        findLast(
          [1, 2, 3, 4],
          function (n: any) {
            return n % 2 == 1;
          },
          2
        )
      ).toEqual(3);
      expect(
        findLast(
          [1, 2, 3, 4],
          function (n: any) {
            return n % 2 == 1;
          },
          1
        )
      ).toEqual(1);
    });
  });

  describe("flatMap", () => {
    test("should res", () => {
      function duplicate(n: any) {
        return [n, n];
      }
      expect(flatMap([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
  });
  describe("flatMapDeep", () => {
    test("should res", () => {
      function duplicate(n: any) {
        return [[[[n, n]]]];
      }
      expect(flatMapDeep([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });
  });
  describe("flatMapDepth", () => {
    test("should res", () => {
      function duplicate(n: any) {
        return [[[n, n]]];
      }
      expect(flatMapDepth([1, 2], duplicate, 2)).toEqual([
        [1, 1],
        [2, 2],
      ]);
    });
  });

  describe("groupBy", () => {
    test("should math floor", () => {
      expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
        "4": [4.2],
        "6": [6.1, 6.3],
      });
    });

    test("should length", () => {
      expect(groupBy(["one", "two", "three"], "length")).toEqual({
        "3": ["one", "two"],
        "5": ["three"],
      });
    });
  });
  describe("includes", () => {
    test("in array", () => {
      expect(includes([1, 2, 3], 1)).toBe(true);
    });
    test("in array and index", () => {
      expect(includes([1, 2, 3], 1, 2)).toBe(false);
    });
    test("in object success", () => {
      expect(includes({ a: 1, b: 2 }, 1)).toBe(true);
    });
    test("in object success", () => {
      expect(includes({ a: 1, b: 2 }, 11)).toBe(false);
    });
    test("in object success", () => {
      expect(includes("abcd", "bc")).toBe(true);
    });
  });
  describe("invokeMap", () => {
    test("split", () => {
      expect(
        invokeMap(
          [
            [5, 1, 7],
            [3, 2, 1],
          ],
          "sort"
        )
      ).toEqual([
        [1, 5, 7],
        [1, 2, 3],
      ]);
    });
    test("sort", () => {
      expect(invokeMap([123, 456], String.prototype.split, "")).toEqual([
        ["1", "2", "3"],
        ["4", "5", "6"],
      ]);
    });
  });
  describe("keyBy", () => {
    const array = [
      { dir: "left", code: 97 },
      { dir: "right", code: 100 },
    ];
    test("function", () => {
      expect(
        keyBy(array, function (o: any) {
          return String.fromCharCode(o.code);
        })
      ).toEqual({
        a: { dir: "left", code: 97 },
        d: { dir: "right", code: 100 },
      });
    });
    test("string", () => {
      expect(keyBy(array, "dir")).toEqual({
        left: { dir: "left", code: 97 },
        right: { dir: "right", code: 100 },
      });
    });
  });

  describe("map", () => {
    function square(n: number) {
      return n * n;
    }
    const users = [{ user: "barney" }, { user: "fred" }];

    test("function square in array", () => {
      expect(map([4, 8], square)).toEqual([16, 64]);
    });
    test("function square in object", () => {
      expect(map({ a: 4, b: 8 }, square)).toEqual([16, 64]);
    });
    test("map for values in object", () => {
      expect(map(users, "user")).toEqual(["barney", "fred"]);
    });
  });

  describe("orderBy", () => {
    const users = [
      { user: "fred", age: 48 },
      { user: "barney", age: 34 },
      { user: "fred", age: 40 },
      { user: "barney", age: 36 },
    ];
    const numbers = [10000, 5, 2000, 300, 40];
    const strings = ["10000", "5", "2000", "300", "40"];
    it("sorting array<object> asc string and desc number", () => {
      const result = orderBy(users, ["user", "age"], ["asc", "desc"]);
      console.log("------------------------------------------");
      console.log("sorting array<object> asc string and desc number");
      console.log(result);
      console.log("------------------------------------------");
      expect(result).toEqual([
        { user: "barney", age: 36 },
        { user: "barney", age: 34 },
        { user: "fred", age: 48 },
        { user: "fred", age: 40 },
      ]);
    });
    it("sorting array<object> asc number and desc string", () => {
      const result = orderBy(users, ["age", "user"], ["asc", "desc"]);
      console.log("------------------------------------------");
      console.log("sorting array<object> asc number and desc string");
      console.log(result);
      console.log("------------------------------------------");
      expect(result).toEqual([
        { user: "barney", age: 34 },
        { user: "barney", age: 36 },
        { user: "fred", age: 40 },
        { user: "fred", age: 48 },
      ]);
    });
    it("sorting array<object> desc string  and desc number", () => {
      expect(orderBy(users, ["user", "age"], ["desc", "desc"])).toEqual([
        { user: "fred", age: 48 },
        { user: "fred", age: 40 },
        { user: "barney", age: 36 },
        { user: "barney", age: 34 },
      ]);
    });
    it("sorting array<object> desc string  and asc number", () => {
      const result = orderBy(users, ["user", "age"], ["desc", "asc"]);
      expect(result).toEqual([
        { user: "fred", age: 40 },
        { user: "fred", age: 48 },
        { user: "barney", age: 34 },
        { user: "barney", age: 36 },
      ]);
    });
    it("sorting strings desc", () => {
      expect(orderBy(strings, null, ["desc", "asc"])).toEqual([
        "5",
        "40",
        "300",
        "2000",
        "10000",
      ]);
    });
    it("sorting strings asc", () => {
      expect(orderBy(strings, null, ["asc", "desc"])).toEqual([
        "10000",
        "2000",
        "300",
        "40",
        "5",
      ]);
    });
    it("sorting numbers desc", () => {
      expect(orderBy(numbers, null, ["desc", "asc"])).toEqual([
        10000,
        2000,
        300,
        40,
        5,
      ]);
    });
    it("sorting numbers asc", () => {
      expect(orderBy(numbers, null, ["asc", "desc"])).toEqual([
        5,
        40,
        300,
        2000,
        10000,
      ]);
    });
  });
  describe("partition", () => {
    const users = [
      { user: "barney", age: 36, active: false },
      { user: "fred", age: 40, active: true },
      { user: "pebbles", age: 1, active: false },
    ];
    it("test function", () => {
      expect(
        partition(users, function (o: any) {
          return o.active;
        })
      ).toEqual([
        [{ user: "fred", age: 40, active: true }],
        [
          { user: "barney", age: 36, active: false },
          { user: "pebbles", age: 1, active: false },
        ],
      ]);
    });
    it("test object", () => {
      expect(partition(users, { age: 1, active: false })).toEqual([
        [{ user: "pebbles", age: 1, active: false }],
        [
          { user: "barney", age: 36, active: false },
          { user: "fred", age: 40, active: true },
        ],
      ]);
    });
    it("test array", () => {
      expect(partition(users, ["active", false])).toEqual([
        [
          { user: "barney", age: 36, active: false },
          { user: "pebbles", age: 1, active: false },
        ],
        [{ user: "fred", age: 40, active: true }],
      ]);
    });
    it("test string", () => {
      expect(partition(users, "active")).toEqual([
        [{ user: "fred", age: 40, active: true }],
        [
          { user: "barney", age: 36, active: false },
          { user: "pebbles", age: 1, active: false },
        ],
      ]);
    });
  });

  describe("reduce", () => {
    test("sum", () => {
      expect(
        reduce(
          [1, 2],
          function (sum: any, n: any) {
            return sum + n;
          },
          0
        )
      ).toEqual(3);
    });
    test("object", () => {
      expect(
        reduce(
          { a: 1, b: 2, c: 1 },
          function (result: any, value: any, key: any) {
            (result[value] || (result[value] = [])).push(key);
            return result;
          },
          {}
        )
      ).toEqual({ "1": ["a", "c"], "2": ["b"] });
    });
  });
  describe("reduceRight", () => {
    test("sum", () => {
      expect(
        reduceRight(
          [1, 2],
          function (sum: any, n: any) {
            return sum + n;
          },
          0
        )
      ).toEqual(3);
    });
    test("object", () => {
      expect(
        reduceRight(
          { a: 1, b: 2, c: 1 },
          function (result: any, value: any, key: any) {
            (result[value] || (result[value] = [])).push(key);
            return result;
          },
          {}
        )
      ).toEqual({ "1": ["c", "a"], "2": ["b"] });
    });
    test("flat", () => {
      const array = [
        [0, 1],
        [2, 3],
        [4, 5],
      ];
      expect(
        reduceRight(
          array,
          function (flattened: any, other: any) {
            return flattened.concat(other);
          },
          []
        )
      ).toEqual([4, 5, 2, 3, 0, 1]);
    });
  });

  describe("reject", () => {
    const users = [
      { user: "barney", age: 36, active: false },
      { user: "fred", age: 40, active: true },
    ];
    it("test function", () => {
      expect(
        reject(users, function (o: any) {
          return !o.active;
        })
      ).toEqual([{ user: "fred", age: 40, active: true }]);
    });
    it("test object", () => {
      expect(reject(users, { age: 40, active: true })).toEqual([
        { user: "barney", age: 36, active: false },
      ]);
    });
    it("test array", () => {
      expect(reject(users, ["active", false])).toEqual([
        { user: "fred", age: 40, active: true },
      ]);
    });
    it("test string", () => {
      expect(reject(users, "active")).toEqual([
        { user: "barney", age: 36, active: false },
      ]);
    });
  });
  describe("sample", () => {
    test('numbers', () => {
      const ar = [4,8,9,500]
      expect(sample(ar)).toBeOneOf(ar)
    })
    test('strings', () => {
      
      const ar = ["2dfs", "sfgafsh", "dawq"]
      expect(sample(ar)).toBeOneOf(ar)
    })
    
  })
  describe('sampleSize', () => {
    const array = [1,2,3]
    it('return items is size < array.length', () => {
      const res = sampleSize(array, 2)
      expect(array).toEqual(expect.arrayContaining(res))
      expect(res).not.toBeOneOf([[1,1],[2,2],[3,3]])
      expect(res).toBeArrayOfSize(2)
    });   
    
    it('return items is size < array.length', () => {
      const res = sampleSize(array, 4)
      expect(array).toEqual(expect.arrayContaining(res))
      expect(res.length).toBe(new Set(res).size)
      expect(res).toBeArrayOfSize(3)
    });   
    
  })
  describe('shuffle', () => {
    const array = [1,2,3,4]
    it('test shuffle', () => {
      const res = shuffle(array)
      expect(res).toIncludeSameMembers(array)
      expect(res.length).toBe(new Set(res).size)
      expect(res).toBeArrayOfSize(4)
    });     
    it('without repeat values', () => {
      const res = shuffle(array)
      expect(res.length).toBe(new Set(res).size)
    });     
    
  })
  
  describe('size', () => {
    it('array size', () => {
      expect(size([8,2,2341223])).toBe(3)
    });
    it('object size', () => {
      expect(size({a:1,name:"max",age:18,react: true,angular:false})).toBe(5)
      expect(size({a:1,b:2})).toBe(2)
    });
    it('array size', () => {
      expect(size("pebbles")).toBe(7)
    });
    
    
  })
  
  describe('some', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred',   'active': false }
    ];

    it('function', () => {
      expect(some([null, 0, 'yes', false],Boolean)).toBeTrue()
    });
    it('object false', () => {
      expect(some(users,{ 'user': 'barney', 'active': false })).toBeFalse()
    });
    it('object true', () => {
      expect(some(users,{ 'user': 'fred', 'active': false })).toBeTrue()
    });
    it('array', () => {
      expect(some(users,['active', false])).toBeTrue()
    });
    it('string true', () => {
      expect(some(users,"active")).toBeTrue()
    });
    it('string false', () => {
      expect(some(users,"nonkey")).toBeFalse()
    });
    

  })

  describe('sortBy', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred', 'age': 40 },
      { 'user': 'barney', 'age': 34 }
    ];
  

    it('test array of func', () => {
      expect(sortBy(users, [(o: any) => o.user])).toEqual([
        { 'user': 'barney', 'age': 36 },
        { 'user': 'barney', 'age': 34 },
        { 'user': 'fred', 'age': 48 },
        { 'user': 'fred', 'age': 40 },
      ])
    });
    it('test array of different func', () => {
      expect(sortBy(users, [(o: any) => o.user,(o: any) => o.age])).toEqual([
        { 'user': 'barney', 'age': 34 },
        { 'user': 'barney', 'age': 36 },
        { 'user': 'fred', 'age': 40 },
        { 'user': 'fred', 'age': 48 },
      ])
    });
    it('func', () => {
      expect(sortBy(users, (o: any) => o.age)).toEqual([
        { 'user': 'barney', 'age': 34 },
        { 'user': 'barney', 'age': 36 },
        { 'user': 'fred', 'age': 40 },
        { 'user': 'fred', 'age': 48 },
      ])
    });
    it('string', () => {
      expect(sortBy(users, "user")).toEqual([
        { 'user': 'barney', 'age': 36 },
        { 'user': 'barney', 'age': 34 },
        { 'user': 'fred', 'age': 48 },
        { 'user': 'fred', 'age': 40 },
      ])
    });
    it('array of dif string', () => {
      expect(sortBy(users, ["user","age"])).toEqual([
        { 'user': 'barney', 'age': 34 },
        { 'user': 'barney', 'age': 36 },
        { 'user': 'fred', 'age': 40 },
        { 'user': 'fred', 'age': 48 },
      ])
    });
    it('array of string and func', () => {
      expect(sortBy(users, [(o: any) => o.user, "age"])).toEqual([
        { 'user': 'barney', 'age': 34 },
        { 'user': 'barney', 'age': 36 },
        { 'user': 'fred', 'age': 40 },
        { 'user': 'fred', 'age': 48 },
      ])
    });
  
  })

});
