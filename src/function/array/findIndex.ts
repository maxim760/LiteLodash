export const findIndex = (array: any[], predicate: any, index = 0) => {
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
  const number = array.slice(index).findIndex((item) => compare(item));
  if (number === -1) {
    return number
  }
  return number + index;
};

var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

// console.log(
//   findIndex(users, function (o: any) {
//     return o.user == "barney";
//   })
// );
// // => 0

// // The `console.log(matches` iteratee shorthand.
// console.log(findIndex(users, { user: "fred", active: false }));
// // => 1

// // The `console.log(matchesProperty` iteratee shorthand.
// console.log(findIndex(users, ["active", false]));
// // => 0

// // The `console.log(property` iteratee shorthand.
// console.log(findIndex(users, "active"));
// // => 2

// // console.log(
// //   findIndex(
// //     users,
// //     function (o: any) {
// //       return o.active == false;
// //     },
// //     0
// //   )
// // );
// // console.log(
// //   findIndex(
// //     users,
// //     function (o: any) {
// //       return o.active == false;
// //     },
// //     1
// //   )
// // );