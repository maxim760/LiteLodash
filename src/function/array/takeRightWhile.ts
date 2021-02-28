export const takeRightWhile = (array: any, predicate: any) => {
  const check = (item: any) =>
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

  const number = [...array].reverse().findIndex((item) => !check(item));
  if (number === -1) {
    return [];
  }
  return array.slice(array.length - number);
};

var users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
  { user: "pebbles", active: false },
];

// console.log(
//   takeRightWhile(users, function (o: any) {
//     return !o.active;
//   })
// );
// // => objects for ['fred', 'pebbles']

// // The `console.log(matches` iteratee shorthand.
// console.log(takeRightWhile(users, { user: "pebbles", active: false }));
// // => objects for ['pebbles']

// // The `console.log(matchesProperty` iteratee shorthand.
// console.log(takeRightWhile(users, ["active", false]));
// // => objects for ['fred', 'pebbles']

// // The `console.log(property` iteratee shorthand.
// console.log(takeRightWhile(users, "active"));
// => []
