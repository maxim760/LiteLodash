export const without = (array: any[], ...values: any[]) => {
  return array.filter(item => !values.some(value => value === item))
}

// console.log(without([2, 1, 2, 3], 1, 2))
// => [3]