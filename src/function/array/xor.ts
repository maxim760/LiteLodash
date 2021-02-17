export const xor = (...arrays: any[]) => {
  return arrays
    .flat()
    .filter(
      (item, _, array) => array.indexOf(item) === array.lastIndexOf(item)
    );
};


// console.log(xor([2, 1], [2, 3]));
// // => [1, 3]


// console.log(xor([2, 1], [2, 3], [5], [6], [1,6,6,6], [7,2,6]));
// // => [3,5,7]
