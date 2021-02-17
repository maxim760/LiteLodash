export const uniqWith = (array: any[], func: any): any[] => {
  return array.reduce((acc: any[], value) => {
    if (!acc.some((item) => func(item, value))) {
      acc.push(value);
      return acc;
    }
    return acc;
  }, []);
};

var objects = [1,2,3,4,5,1,4,4,4,4,4,5,5,5,6,6,6,6,8,8,1,1,12,312,1,23,12,312,6,7,8,9];
// console.log(uniqWith(objects, (a: any,b: any) => a === b));

// => [1,2,3,4,5,6,8,12,312,23,7,9]