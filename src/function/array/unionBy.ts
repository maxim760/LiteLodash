export const unionBy = (...arrays: any) => {
  const func = arrays.pop();
  const compare = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const check = (item: any) =>
    compare(item) ? compare(item) : compare(item.toString());

  return arrays.flat().reduce((acc: any[], value: any) => {
    if (acc.some((item) => check(item) === check(value))) {
      return acc;
    }
    acc.push(value);
    return acc;
  }, []);
};

console.log(unionBy([2.1], [1.2, 2.3], Math.floor));
// => [2.1, 1.2]

// The `console.log(property` iteratee shorthand.
console.log(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x"))
// => [{ 'x': 1 }, { 'x': 2 }]
