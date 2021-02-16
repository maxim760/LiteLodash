export const pullAllBy = (array: any[], removeAr: any[], func: any) => {
  const compare = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const check = (item: any) =>
    compare(item) ? compare(item) : compare(item.toString());

  return array.filter(item => !removeAr.some(compItem => check(item) === check(compItem)))

};


var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

// console.log(pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x'));
// console.log(array);
// // => [{ 'x': 2 }]