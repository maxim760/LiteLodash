export const pullAt = (array: any[], nums: number | number[]) => {
  if (typeof nums === "number") {
    return array.splice(nums, 1);
  }
  let count = 0;
  const pulled: any[] = [];
  nums.forEach((num) => {
    pulled.push(array.splice(num - count++, 1)[0]);
  });
  return pulled;
};

// var array = ['a', 'b', 'c', 'd'];
// var pulled = pullAt(array, [1, 3]);

// console.log(array);
// // => ['a', 'c']

// console.log(pulled);
// // => ['b', 'd']

// var array = ["a", "b", "c", "d"];
// var pulled = pullAt(array, 1);

// console.log(array);
// // => ['a', 'c', 'd']

// console.log(pulled);
// // => ['b']
