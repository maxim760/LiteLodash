export const intersection = (...arrays: any[]) => {
  const [array, ...other] = arrays
  return array.filter((item: any) => other.every(oth => oth?.includes(item)))
}

// console.log(intersection([2, 1], [2, 3]))
// // => [2]

// console.log(intersection([2, 1], [2, 3], [5]))
// // => []