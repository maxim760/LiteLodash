export const intersectionWith = (...arrays: any) => {
  const compare = arrays.pop();
  const [array, ...other] = arrays;

  return array.filter((item: any) =>
    other.every((othAr: any) =>
      othAr.some((compItem: any) => compare(compItem, item))
    )
  );
};

const arrs1 = [1, 2, 3, 4];
const arrs2 = [1, 2, 3, 5, 6, 7];
const arrs3 = [2, 3, 5, 6, 7];
const arrs4 = [2, 3, 9];
// console.log(
//   intersectionWith(arrs1, arrs2, arrs3, arrs4, (a: any, b: any) => a === b)
// );
// => 2,3
