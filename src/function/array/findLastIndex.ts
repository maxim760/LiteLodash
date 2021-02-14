export const findLastIndex = (
  array: any[],
  predicate: any,
  index = array.length - 1
) => {
  const compare = (item: any) =>
    typeof predicate === "function"
      ? predicate(item)
      : typeof predicate === "string"
      ? item === predicate || item[predicate] === true
      : Array.isArray(predicate)
      ? Object.keys(item).some(
          (compKey) =>
            compKey === predicate[0] && item[compKey] === predicate[1]
        )
      : Object.keys(predicate).every(
          (compKey) => item[compKey] === predicate[compKey] && compKey in item
        );
  const number = [...array]
    .reverse()
    .slice(0, index + 1)
    .findIndex((item) => compare(item));
  if (number === -1) {
    return number;
  }
  return index - number;
};

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];


// console.log(
//   findLastIndex(users, function (o: any) {
//     return o.user == "pebbles";
//   })
// );
// // => 2

// console.log(findLastIndex(users, { user: "barney", active: true }));
// // => 0

// console.log(findLastIndex(users, ["active", false]));
// // => 2

// console.log(findLastIndex(users, "active"));
// // => 0

// console.log(findLastIndex(users, ["active", false], 1));