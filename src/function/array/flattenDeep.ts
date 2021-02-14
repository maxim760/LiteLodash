export const flattenDeep = (array: any[]): any => {
  const isFlatArray = (array: any[]): any =>
    array.every((item: any) => !Array.isArray(item));
  let fake = JSON.parse(JSON.stringify(array));
  while (!isFlatArray(fake)) {
    fake = fake.flat();
  }

  return fake;
};

console.log(flattenDeep([1, 2, 3, 4, 5]));
console.log(flattenDeep([1, 2, 3, [4, 5]]));
console.log(flattenDeep([1, 2, 3, [4, [5]]]));
console.log(flattenDeep([1, 2, 3, [4, [[5]]]]));
console.log(flattenDeep([1, [[[[[[[[[[[[2]]]]]]]]]]]], 3, [4, [[5]]]]));
console.log(
  flattenDeep([
    [
      [1, [2, 3]],
      [[4], [[5]]],
    ],
  ])
);
console.log(flattenDeep([1, 2, 3, [[4], [[[5]]]]]));
