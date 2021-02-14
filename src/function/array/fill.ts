export const fill = (
  array: any,
  sym: any,
  start: number = 0,
  end: number = array.length
) => {
  return Array.from(array, (item: any, index: number) => {
    return index >= start && index < end ? sym : item;
  });
};

const array = [1, 2, 3];

// console.log(fill(array, "a"));
// // => ['a', 'a', 'a']

// console.log(fill(Array(3), 2));
// // => [2, 2, 2]

// console.log(fill([4, 6, 8, 10], "*", 1, 3));
// // => [4, '*', '*', 10]
