export const lastIndexOf = (
  array: any[],
  value: any,
  index: number = array.length - 1
) => {
  return array.lastIndexOf(value, index);
};

// console.log(lastIndexOf([1, 2, 1, 2], 2));
// // => 3

// // Search from the `fromIndex`.
// console.log(lastIndexOf([1, 2, 1, 2], 2, 2));
// // => 1
