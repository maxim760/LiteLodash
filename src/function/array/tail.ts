export const tail = (array: any[], num: number = 1) => {
  return array.slice(num)
}

// console.log(tail([1, 2, 3]));
// => [2, 3]