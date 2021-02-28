export const zipWith = (...arrays: any) => {
  const func = arrays.pop()
  const maxLen = Math.max(...arrays.map((ar: any) => ar.length));
  const res = [];
  for (let i = 0; i < maxLen; i++) {
    res.push(func(...arrays.map((item: any) => item[i])))
  }
  return res
};

// console.log(zipWith([1, 2], [10, 20], [100, 200], function(a: any, b: any, c: any) {
//   return a + b + c;
// }));
// => [111, 222]
