export const intersectionBy = (...arrays: any) => {
  const func = arrays.pop();
  const [array, ...other] = arrays;

  const compare = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const check = (item: any) =>
    compare(item) ? compare(item) : compare(item.toString());
  
  return array.filter((item: any) =>
    other.every((othAr: any) =>
      othAr.some((compItem: any) => check(compItem) === check(item))
    )
  );
};

// console.log(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor));
// // => [2.1]

// // The `console.log(property` iteratee shorthand.
// console.log(intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x"));
// // => [{ 'x': 1 }]
