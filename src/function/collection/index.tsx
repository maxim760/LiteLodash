export const countBy = (array: any[], func: any) => {
  const check = (item: any) =>
    typeof func === "function" ? func(item) : item[func];
  const getRes = (item: any) =>
    check(item) ? check(item) : check(item.toString());

  return array.reduce((acc, value) => {
    const key = getRes(value);
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});
};

export const every = (array: any[], predicate: any) => {
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
  return array.every((item) => check(item));
};

export const filter = (array: any[], predicate: any) => {
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
  return array.filter((item) => check(item));
};

export const findLast = (
  array: any[],
  predicate: any,
  fromIndex: number = array.length - 1
) => {
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
  return [...array]
    .reverse()
    .slice(array.length - 1 - fromIndex)
    .find((item) => check(item));
};

export const find = (array: any[], predicate: any, fromIndex: number = 0) => {
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
  return array.slice(fromIndex).find((item) => check(item));
};

export const flatMap = (array: any[], func: any) => {
  return array.map((item) => func(item)).flat();
};

export const flatMapDeep = (array: any[], func: any) => {
  const mappedArray = array.map((item) => func(item));
  const isFlatArray = (array: any[]): any =>
    array.every((item: any) => !Array.isArray(item));
  let newArray = JSON.parse(JSON.stringify(mappedArray));
  while (!isFlatArray(newArray)) {
    newArray = newArray.flat();
  }

  return newArray;
};
export const flatMapDepth = (array: any[], func: any, number: number) => {
  return array.map((item) => func(item)).flat(number);
};

export const forEach = (obj: any, func: any) => {
  if (Array.isArray(obj)) {
    obj.forEach(func);
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      func(value, key);
    });
  }
};

forEach([1, 2], function (value: any) {
  // console.log(value);
});
// => Logs `1` then `2`.

forEach({ a: 1, b: 2 }, function (value: any, key: any) {
  // console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).

export const forEachRight = (obj: any, func: any) => {
  if (Array.isArray(obj)) {
    for (let i = obj.length - 1; i >= 0; i--) {
      func(obj[i]);
    }
  } else {
    const arrayEntries = Object.entries(obj);
    for (let i = arrayEntries.length - 1; i >= 0; i--) {
      func(arrayEntries[i][0], arrayEntries[i][1]);
    }
  }
};
// forEachRight({a:1, b:2}, function(key: any,value: any) {
//     console.log(key, value);
// });
// forEachRight([1,2,3,4], function(value: any) {
//     console.log(value);
// });

export const groupBy = (collection: any, iteratee: any) => {
  const group = (item: any) =>
    typeof iteratee === "function" ? iteratee(item) : item[iteratee];
  return collection.reduce((acc: any, value: any) => {
    const res = group(value);
    if (!acc[res]) {
      acc[res] = [];
    }
    acc[res].push(value);
    return acc;
  }, {});
};

export const includes = (
  collection: object | any[] | string,
  value: any,
  fromIndex: number = 0
) => {
  return typeof collection === "object"
    ? Object.values(collection).includes(value, fromIndex)
    : collection.includes(value, fromIndex);
};

export const invokeMap = (collection: any[], path: any, ...args: any) => {
  if (!args?.length) {
    args = [undefined];
  }
  console.log(args);
  return collection.map((item) => {
    return typeof path === "function"
      ? path.apply(item, args)
      : item[path](...args);
  });
};

export const keyBy = (collection: any[], predicate: any) => {
  const getRes = (item: any) =>
    typeof predicate === "function"
      ? predicate(item)
      : item[predicate] || item[predicate.toString()];

  return collection.reduce((acc, value) => {
    const res = getRes(value);
    acc[res] = value;
    return acc;
  }, {});
};

export const map = (
  collection: any[] | { [key: string]: any },
  predicate: any
) => {
  const getRes = (item: any) =>
    typeof predicate === "function"
      ? predicate(item)
      : item[predicate] || item[predicate.toString()];
  if (Array.isArray(collection)) {
    return collection.map((item) => getRes(item));
  }
  return Object.keys(collection).map((item) => getRes(collection[item]));
};

export const orderBy = (collection: any[], predicate: any, orders: any) => {
  const localComp = (a: any, b: any) => {
    return (
      a.toString().localeCompare(b.toString()) -
      b.toString().localeCompare(a.toString())
    );
  };
  const isDesc = (item: any) => /^desc/i.test(item.toString());
  const newCol = [...collection];
  const sorting = (str: any) => (a: any, b: any) => {
    if (!isDesc(str)) {
      if (typeof a === "number") {
        return a - b;
      }
      return localComp(a, b);
    }
    if (typeof a === "number") {
      return b - a;
    }
    return localComp(b, a);
  };
  const flag = (a: any, b: any) => {
    let tFlag = 0;
    predicate.forEach((item: any, i: number) => {
      tFlag = tFlag || sorting(orders[i])(a[item], b[item]);
    });
    return tFlag;
  };

  const sort = () => {
    if (!predicate || !predicate.length) {
      return newCol.sort(sorting(orders));
    }
    if (typeof predicate === "string" || predicate?.length === 1) {
      return newCol.sort((a, b) => {
        return sorting(orders)(
          a[predicate.toString()],
          b[predicate.toString()]
        );
      });
    }
    return newCol.sort(flag);
  };

  return sort();
};
// сортировка пока самое сложное

export const partition = (collection: any[], predicate: any) => {
  const isTruthy = (item: any) =>
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
  // [0] - тру значения
  // [1] - фолс значения
  return collection.reduce(
    (acc, value) => {
      isTruthy(value) ? acc[0].push(value) : acc[1].push(value);
      return acc;
    },
    [[], []]
  );
};

export const reduce = (collection: any, func: any, acc: any) => {
  if (Array.isArray(collection)) {
    return collection.reduce(func, acc);
  }
  return Object.keys(collection).reduce((acc, key) => {
    return func(acc, collection[key], key);
  }, acc);
};
export const reduceRight = (collection: any, func: any, acc: any) => {
  if (Array.isArray(collection)) {
    return collection.reduceRight(func, acc);
  }
  return Object.keys(collection).reduceRight((acc, key) => {
    return func(acc, collection[key], key);
  }, acc);
};

export const reject = (collection: any[], predicate: any) => {
  const isTruthy = (item: any) =>
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
  return collection.reduce((acc, value) => {
    !isTruthy(value) && acc.push(value);
    return acc;
  }, []);
};

export const sample = (collection: any[]) => {
  const getRandom = (start: number, end: number) =>
    Math.floor(Math.random() * (end - start) + start);

  const index = getRandom(0, collection.length);
  return collection[index];
};

export const sampleSize = (collection: any[], num: number) => {
  const newCol = [...collection];
  const getRandom = (start: number, end: number) =>
    Math.floor(Math.random() * (end - start) + start);
  const size = Math.min(newCol.length, num);
  return Array.from({ length: size }, () => {
    const index = getRandom(0, newCol.length);
    return newCol.splice(index, 1)[0];
  });
};

export const shuffle = (collection: any[]) => {
  const getRandom = (start: number, end: number) =>
    Math.floor(Math.random() * (end - start) + start);
  const newCol = [...collection];
  const size = newCol.length;
  return Array.from({ length: size }, () => {
    const index = getRandom(0, newCol.length);
    return newCol.splice(index, 1)[0];
  });
};
export const size = (collection: any) => {
  return typeof collection === "object"
    ? Object.keys(collection).length
    : collection.length;
};

export const some = (collection: any[], predicate: any) => {
  const isTruthy = (item: any) =>
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
  return collection.some((item) => isTruthy(item));
};

export const sortBy = (collection: any[], pr: any) => {
  if (!pr || pr.length === 0) {
    return collection;
  }
  const predicate = Array.isArray(pr) ? pr : [pr];
  const localComp = (a: any, b: any) =>
    a.toString().localeCompare(b.toString()) -
    b.toString().localeCompare(a.toString());
  const getItem = (prop: any) => (item: any) =>
    typeof prop === "function" ? prop(item) : item[prop];
  const newCol = [...collection];

  const sorting = (a: any, b: any) => {
    if (typeof a === "number") {
      return a - b;
    }
    return localComp(a, b);
  };
  const flag = (a: any, b: any) => {
    let tFlag = 0;
    predicate.forEach((prop: any, i: number) => {
      const getProp = getItem(prop);
      tFlag = tFlag || sorting(getProp(a), getProp(b));
    });
    return tFlag;
  };

  return newCol.sort(flag);
};
