export const unzip = (array: any[][]): any[] => {
  const maxLen = Math.max(...array.map(item => item.length))
  return array.reduce((acc, value, idxZip) => {
    for (let i = 0; i < maxLen; i++) {
      if(!acc[i]) acc[i] = []
      acc[i][idxZip] = value[i] ?? undefined
    }
    return acc
  }, [])
}


const zipped = [['a', 1, true], ['b', 2, false]]
const zipped2 = [['a', 1, true], ['b', 2, false,55,"kek"]]


// console.log(unzip(zipped));
// => [['a', 'b'], [1, 2], [true, false]]

// console.log(unzip(zipped2));
// => [["a", "b"], [1, 2], [true, false], [undefined, 55], [undefined, "kek"]]
