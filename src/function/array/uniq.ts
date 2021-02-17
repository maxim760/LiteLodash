export const uniq = (array: any[]) => {
  return Array.from(new Set(array))
}


// console.log(uniq([2, 1, 2]));
// => [2, 1]