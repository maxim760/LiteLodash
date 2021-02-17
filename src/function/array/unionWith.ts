export const unionWith = (...arrays: any) => {
  const func = arrays.pop();

  return arrays.flat().reduce((acc: any[], value: any) => {
    if (acc.some((item) => func(item, value))) {
      return acc;
    }
    acc.push(value);
    return acc;
  }, []);
};

// console.log(unionWith([4, 5, 6], [1, 2, 3, 4, 5], (a: any, b: any) => a === b));
// // => [4,5,6,1,2,3]

// console.log(
//   unionWith(
//     [4, 5, 6],
//     [1, 2, 3, 4, 5],
//     [9],
//     [1, 2],
//     [5, 8, 8, 8, 8, 5, 5, 6],
//     [4],
//     (a: any, b: any) => a === b
//   )
// );
// => [4,5,6,1,2,3, 9,8]
