export const uniqBy = (array: any[], func: any): any[] => {
  const compare = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const check = (item: any) =>
    compare(item) ? compare(item) : compare(item.toString());
  return array.reduce((acc: any[], value) => {
    if (!acc.some((item) => check(item) === check(value))) {
      acc.push(value);
      return acc;
    }
    return acc;
  }, []);
};

// console.log(uniqBy([2.1, 1.2, 2.3], Math.floor));
// => [2.1, 1.2]

// console.log(uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], "x"));
// => [{ 'x': 1 }, { 'x': 2 }]
