export const sortedIndexBy = (array: any[], value: any, func: any) => {
  const getRes = (item: any) => typeof func === "function" ? func(item) : item[func] 
  let index = null
  array.reduce((acc, num, i) => {
    if (getRes(value) > getRes(num) && (getRes(num) > acc || acc === null)) {
      acc = getRes(num)
      index = i + 1
    }
    return acc
  }, null)
  return index || 0
}


var objects = [{ 'x': 4 }, { 'x': 5 }];

// console.log(sortedIndexBy(objects, { 'x': 4 }, function(o: any) { return o.x; }));
// // => 0

// // The `_.property` iteratee shorthand.
// console.log(sortedIndexBy(objects, { 'x': 4 }, 'x'));
// // => 0

// console.log(sortedIndexBy(objects, { 'x': 5 }, 'x'));
// // => 1