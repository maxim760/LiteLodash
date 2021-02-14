export const dropRight = (array: any[], number: number = 1) => {
  const dif = array.length - number > 0 ? array.length - number : 0 
  return array.slice(0, dif );
};

// console.log(dropRight([1, 2, 3]));
// // => [1, 2]

// console.log(dropRight([1, 2, 3], 2));
// // => [1]

// console.log(dropRight([1, 2, 3], 5));
// // => []

// console.log(dropRight([1, 2, 3], 0));
// // => [1, 2, 3]
