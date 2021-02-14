export const dropWhile = (array: any[], predicate: any) => {
  const compare = (item: any) =>
    typeof predicate === "function"
      ? predicate(item)
      : typeof predicate === "string" || item[predicate] === true
      ? item === predicate.toString()
      : Array.isArray(predicate)
      ? Object.keys(item).some(
          (compKey) =>
            compKey === predicate[0] && item[compKey] === predicate[1]
        )
      : Object.keys(predicate).every(
          (compKey) => item[compKey] === predicate[compKey] && compKey in item
        );
  const number = array.findIndex((item) => !compare(item));
  if (number === -1) {
    return [];
  }
  return array.slice(number);
};

var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

// console.log(
//   dropWhile(users, function (o: any) {
//     return !o.active;
//   })
// );
// // => objects for ['pebbles']

// // The `console.log(matches` iteratee shorthand.
// console.log(dropWhile(users, { user: "barney", active: false }));
// // => objects for ['fred', 'pebbles']

// // The `console.log(matchesProperty` iteratee shorthand.
// console.log(dropWhile(users, ["active", false]));
// // => objects for ['pebbles']

// // The `console.log(property` iteratee shorthand.
// console.log(dropWhile(users, "active"));
// // => objects for ['barney', 'fred', 'pebbles']
