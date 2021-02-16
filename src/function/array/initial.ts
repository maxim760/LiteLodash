export const initial = (array: any[]) => {
  const last = array.length - 1
  return array.slice(0,last)
};

// const ar = [1,2,3]
// console.log(initial(ar))
// // => [1, 2]
