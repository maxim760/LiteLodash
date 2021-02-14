export const concat = (array: any[], ...array2: any[]): any[] => {
  return [].concat.apply(array,array2)
};

var array = [1];
var other = concat(array, 2, [3], [[4]]);

// console.log(other);
// // => [1, 2, 3, [4]]

// console.log(array);
// // => [1]
