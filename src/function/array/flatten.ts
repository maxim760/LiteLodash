export const flatten = (array: any[]): any[] => {
  return array.flat()
}

// console.log(flatten([1, [2, [3, [4]], 5]]))
// // => [1, 2, [3, [4]], 5]