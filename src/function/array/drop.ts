export const drop = (array: any[], number: number = 1) => {
  return array.slice(number);
};

// console.log(drop([1, 2, 3]));
// // => [2, 3]

// console.log(drop([1, 2, 3], 2));
// // => [3]

// console.log(drop([1, 2, 3], 5));
// // => []

// console.log(drop([1, 2, 3], 0));
// // => [1, 2, 3]
