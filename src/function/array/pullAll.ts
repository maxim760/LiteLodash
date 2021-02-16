export const pullAll = (array: any[], removeAr: any[]): any[] => {
  return array.filter((item) => !removeAr.includes(item))
}

var array = ['a', 'b', 'c', 'a', 'b', 'c'];

// console.log(pullAll(array, ['a', 'c']));
// console.log(array);
// // => ['b', 'b']