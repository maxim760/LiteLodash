export const unzipWith = (array: any[][], func: any): any[] => {
  const maxLen = Math.max(...array.map((item) => item.length));
  const res = [];
  for (let i = 0; i < maxLen; i++) {
    res.push(func(array[0][i],array[1][i]))
  }
  return res
};

const sum = (a: any = 0, b: any = 0) => a + b;
const zipped = [[1, 10, 100], [2, 20, 200]]

// console.log(unzipWith(zipped, sum))
// => [3, 30, 300]