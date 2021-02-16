export const indexOf = (array: any[], value: any, index: number = 0) => {
  return array.indexOf(value, index);
};

// console.log(indexOf([1, 2, 1, 2], 2));
// // => 1

// // Search from the `fromIndex`.
// console.log(indexOf([1, 2, 1, 2], 2, 2));
// // => 3
