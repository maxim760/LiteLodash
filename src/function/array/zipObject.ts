export const zipObject = (keyArray: any[], valueArray: any[]) => {
  return keyArray.reduce((acc, value, i) => {
    acc[value] = valueArray[i]
    return acc
  }, {})
}

// console.log(zipObject(['a', 'b'], [1, 2,3]))
// // => { 'a': 1, 'b': 2 }


// console.log(zipObject(['a', 'b'], [1, 2]))
// // => { 'a': 1, 'b': 2 }


// console.log(zipObject(['a', 'b', 'c'], [1, 2,3]))
// // => { 'a': 1, 'b': 2, c: 3}

// console.log(zipObject(['a', 'b', 'c'], [1, 2]))
// // => { 'a': 1, 'b': 2, c: undefined}