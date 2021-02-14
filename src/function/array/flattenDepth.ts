export const flattenDepth = (array: any[], number: number = 1) => {
  return array.flat(number)
}

var array = [1, [2, [3, [4]], 5]];


// console.log(flattenDepth(array, 1));
// // => [1, 2, [3, [4]], 5]

// console.log(flattenDepth(array, 2));
// // => [1, 2, 3, [4], 5]


// console.log(flattenDepth(array, 3));