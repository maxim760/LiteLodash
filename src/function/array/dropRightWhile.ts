export const dropRightWhile = (array: any[], predicate: any) => {
  const compare = (item: any) =>
    typeof predicate === "function"
      ? predicate(item)
      : typeof predicate === "string" 
      ? item === predicate.toString() || item[predicate] === true
      : Array.isArray(predicate)
      ? Object.keys(item).some(
          (compKey) =>
            compKey === predicate[0] && item[compKey] === predicate[1]
        )
      : Object.keys(predicate).every(
          (compKey) => item[compKey] === predicate[compKey] && compKey in item
        );
  const number = [...array].reverse().findIndex((item) => !compare(item));
  if (number === -1) {
    return [];
  }
  return array.slice(0, array.length - number);
};

const users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
  { user: "pebbles", active: false },
];

// console.log(
//   dropRightWhile(users, function (o: any) {
//     return !o.active;
//   })
// );
// // => objects for ['barney']

// // The `console.log(matches` iteratee shorthand.
// console.log(dropRightWhile(users, { user: "pebbles", active: false }));
// // => objects for ['barney', 'fred']

// // // The `console.log(matchesProperty` iteratee shorthand.
// console.log(dropRightWhile(users, ["active", false]));
// // => objects for ['barney']

// // // The `console.log(property` iteratee shorthand.
// console.log(dropRightWhile(users, "active"));
// // => objects for ['barney', 'fred', 'pebbles']
