export const take = (array: any[], num: number = 1) => {
  return array.slice(0, num);
};

// console.log(take([1, 2, 3]));
// // => [1]

// console.log(take([1, 2, 3], 2));
// // => [1, 2]

// console.log(take([1, 2, 3], 5));
// // => [1, 2, 3]

// console.log(take([1, 2, 3], 0));
// // => []
