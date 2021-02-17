export const xorBy = (...arrays: any) => {
  const func = arrays.pop()
  const helpFunc = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const getRes = (item: any) =>
    helpFunc(item) ? helpFunc(item) : helpFunc(item.toString());
  const array = arrays.flat()
  const arrayAfterFunc = array.map((item: any) => getRes(item))
  return array.filter((item: any) => arrayAfterFunc.indexOf(getRes(item)) === arrayAfterFunc.lastIndexOf(getRes(item)) )

}


// console.log(xorBy([2.1, 1.2], [2.3, 3.4], Math.floor));
// => [1.2, 3.4]
// console.log(xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x'));
// => [{ 'x': 2 }]