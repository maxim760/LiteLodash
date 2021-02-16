export const union = (...arrays: any[]) => {
  return Array.from(new Set(arrays.flat()))
}


// console.log(union([2,3,4,[[5]]], [1, 2]))
// // 2 3 4 [[5]] 1


// console.log(union([2], [1, 2]))
// // => [2, 1]