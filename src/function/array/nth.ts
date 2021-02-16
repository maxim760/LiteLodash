export const nth = (array: any[], number: number = 0): any => {
  return number >= 0 ? array[number] : array[array.length + number]; // 5 + - 2 => 5 - 2
};

var array = ["a", "b", "c", "d"];

// console.log(nth(array, 1));
// // => 'b'
// console.log(nth(array, -2));
// // => 'c';
