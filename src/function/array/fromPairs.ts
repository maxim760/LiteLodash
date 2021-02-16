export const fromPairs = (array: any[]): object => {
  return array.reduce((acc: any, [key, value]: any[]) => {
    acc[key] = value
    return acc
  }, {})
}

// console.log(fromPairs([['a', 1], ['b', 2]]));
// => { 'a': 1, 'b': 2 }