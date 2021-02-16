export const sortedLastIndex = (array: any[], value: any) => {
  let index = null
  array.reduce((acc, num, i) => {
    if (value >= num && (num >= acc || acc === null)) {
      acc = num
      index = i + 1
    }
    return acc
  }, null)
  return index || 0
}

// console.log(sortedLastIndex([4, 5, 5, 5, 6], 5));
// => 4
