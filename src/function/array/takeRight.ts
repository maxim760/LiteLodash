export const takeRight = (array: any[], num: number = 1) => {
  return num > array.length ? array.slice() : array.slice(array.length - num);
};

// console.log(takeRight([1, 2, 3]))
// // => [3]

// console.log(takeRight([1, 2, 3], 2))
// // => [2, 3]

// console.log(takeRight([1, 2, 3], 5))
// // => [1, 2, 3]

// console.log(takeRight([1, 2, 3], 0))
// // => []
