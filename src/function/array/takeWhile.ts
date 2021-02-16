export const takeWhile = (array: any, predicate: any) => {
  const check = (item: any) =>
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

  const number = [...array].findIndex((item) => !check(item));
  if (number === -1) {
    return [];
  }
  return array.slice(0, number);
};

var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

// console.log(takeWhile(users, function(o: any) { return !o.active; }))
// // => objects for ['barney', 'fred']

// console.log(takeWhile(users, { 'user': 'barney', 'active': false }))
// // => objects for ['barney']

// console.log(takeWhile(users, ['active', false]))
// // => objects for ['barney', 'fred']

// console.log(takeWhile(users, 'active'))
// => []

var users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
  { user: "pebbles", active: false },
];
