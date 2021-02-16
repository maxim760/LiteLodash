export const pullAllWith = (array: any[], removeAr: any[], compare: any) => {
  return array.filter(
    (item) => !removeAr.some((compItem) => compare(item, compItem))
  );
};

var array = [8, 9, 10];

// console.log(pullAllWith(array, [9], (a: any,b: any) => a === b));
// console.log(array);
// => [8, 10]