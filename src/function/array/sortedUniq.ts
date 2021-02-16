export const sortedUniq = (array: any[]): any[] => {
  return Array.from(new Set(array));
};

// console.log(sortedUniq([1, 1, 2, 3, 3, 3, 3, 5]));
// // => [1, 2,3,5]

// console.log(sortedUniq([1, 1, 2]));
// // => [1, 2]
