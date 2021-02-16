export const pull = (array: any[], ...removeAr: any[]) => {
  return array.filter((item) => !removeAr.includes(item));
};

var array = ["a", "b", "c", "a", "b", "c"];

// console.log(pull(array, "a", "c"));
// console.log(array);
// => ['b', 'b']
