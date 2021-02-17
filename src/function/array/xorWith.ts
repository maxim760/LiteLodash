export const xorWith = (...arrays: any) => {
  const func = arrays.pop()
  const array = arrays.flat() as any[]
  const indexToRemove: number[] = []
  return array.reduce((acc: any[], value: any) => {
    const idx = acc.findIndex((item) => func(item, value))
    if (idx >= 0) {
      indexToRemove.push(idx)
      return acc
    }
    acc.push(value);
    return acc;
  }, []).filter((_, i: number) => !indexToRemove.includes(i));
}

// console.log(xorWith([1, 2, 3], [4, 5, 6], [1, 2, 6], [5, 6, 7], [8, 2, 2], [3, 4, 4, 5], (a: any, b: any) => a === b))
// // => [7, 8]

// console.log(xorWith([1, 2, 3], [4, 5, 6], [7,8,22], [22,2,222], [3,6,9], [8], (a: any, b: any) => a === b))
// // => [1, 4, 5, 7, 222, 9]