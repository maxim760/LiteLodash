export const remove = (array: any[], func: any) => {
  return array.reduce((acc, value, i) => {
    if (func(value)) {
      acc.push(array.splice(i, 1)[0]);
    }
    return acc;
  }, []);
};

var array = [1, 2, 3, 4];
var evens = remove(array, function(n: any) {
  return n % 2 == 0;
});


// console.log(array);
// // => [1, 3]
 
// console.log(evens);
// // => [2, 4]
