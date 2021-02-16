export const sortedIndex = (array: any[], value: any) => {
  let index = null
  array.reduce((acc, num, i) => {
    if (value > num && (num > acc || acc === null)) {
      acc = num
      index = i + 1
    }
    return acc
  }, null)
  return index || 0
}

// console.log(sortedIndex([30, 50], 40));
// // => 1

// console.log(sortedIndex([30, 50,35,36,58], 40));
// // => 4
