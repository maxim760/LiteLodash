import { Buffer } from "buffer";
import { isContext } from "vm";

export const castArray = (...args: any) => {
  if (args.length === 0) {
    return [];
  }
  const arg = args[0];
  if (Array.isArray(arg)) {
    return arg;
  }
  return [arg];
};

export const clone = (value: any) => {
  const shallowCopy = (item: any) =>
    Array.isArray(item)
      ? [...item]
      : typeof item === "object"
      ? { ...item }
      : item;
  return shallowCopy(value);
};
export const cloneDeep = (value: any) => {
  const deepCopy = (item: any) =>
    typeof item === "object" ? JSON.parse(JSON.stringify(item)) : item;
  return deepCopy(value);
};

export const cloneDeepWith = (value: any, customizer: any) => {
  customizer = typeof customizer === "function" ? customizer : undefined;
  const deepCopy = (item: any) =>
    typeof item === "object" ? JSON.parse(JSON.stringify(item)) : item;
  const res = deepCopy(value);
  if (!customizer) {
    return res;
  }
  if (typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item, i, array) => customizer(item, i, array));
  }
  return Object.values(value).map((item, i) => customizer(item, i, value));
  // не полностью понял как именно работает customizer
};
export const cloneWith = (value: any, customizer: any) => {
  customizer = typeof customizer === "function" ? customizer : undefined;
  const shallowCopy = (item: any) =>
    Array.isArray(item)
      ? [...item]
      : typeof item === "object"
      ? { ...item }
      : item;
  const res = shallowCopy(value);
  if (!customizer) {
    return res;
  }
  if (typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item, i, array) => customizer(item, i, array));
  }
  return Object.values(value).map((item, i) => customizer(item, i, value));
  // не полностью понял как именно работает customizer
};
export type IObject = { [key: string]: any };

export const conformsTo = (object: IObject, sourse: IObject) => {
  const check = (key: string) => {
    return typeof sourse[key] === "function"
      ? sourse[key](object[key])
      : sourse[key] === object[key];
  };
  return !Object.keys(sourse).some((key) => {
    return !check(key);
  });
};

export const eq = (value: any, other: any) => {
  return value === other || (value !== value && other !== other);
};

export const gt = (value: number, other: number) => value > other;
export const gte = (value: number, other: number) => value >= other;

export const isArguments = (value: any) => {
  return (
    value.toString() ===
    (function (a, b, c) {
      return arguments;
    })().toString()
  );
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};

export const isArrayBuffer = (value: any) => {
  return value instanceof ArrayBuffer;
};

export const isArrayLike = (value: any) => {
  return (value?.length ?? value?.size ?? undefined) !== undefined;
};

export const isArrayLikeObject = (value: any) => {
  return (
    typeof value === "object" &&
    (value?.length ?? value?.size ?? undefined) !== undefined
  );
};

export const isBoolean = (value: any) => typeof value === "boolean";

export const isBuffer = (value: any) => value instanceof Buffer;

export const isDate = (value: any) => value instanceof Date;

export const isElement = (value: any) =>
  value?.children instanceof HTMLCollection;

export const isEmpty = (value: any) =>
  typeof value === "number" || typeof value === "boolean"
    ? true
    : typeof value === "object" && value !== null
    ? Array.isArray(value)
      ? value.length === 0
      : Object.keys(value).length === 0
    : !value;

export const isEqual = (value: any, other: any): boolean => {
  let isEq = true;
  if (value === other || (value !== value && other !== other)) {
    return true;
  }
  if (
    typeof value !== typeof other ||
    typeof value !== "object" ||
    Array.isArray(value) !== Array.isArray(other)
  ) {
    return false;
  }
  if (Array.isArray(value)) {
    if (other.length !== value.length) {
      return false;
    }
    value.forEach((item, i) => {
      isEq = isEq && isEqual(item, other[i]);
    });
  } else {
    if (Object.keys(value).length !== Object.keys(other).length) {
      return false;
    }
    Object.keys(value).forEach((key: string) => {
      isEq = isEq && isEqual(value[key], other[key]);
    });
  }
  return isEq;
};
export const isEqualWith = (
  value: any,
  other: any,
  customizer: Function
): boolean => {
  let isEq = true;
  if (
    value === other ||
    customizer(value, other) ||
    (value !== value && other !== other)
  ) {
    return true;
  }
  if (
    typeof value !== typeof other ||
    typeof value !== "object" ||
    Array.isArray(value) !== Array.isArray(other)
  ) {
    return false;
  }
  if (Array.isArray(value)) {
    if (other.length !== value.length) {
      return false;
    }
    value.forEach((item, i) => {
      isEq = isEq && isEqualWith(item, other[i], customizer);
    });
  } else {
    if (Object.keys(value).length !== Object.keys(other).length) {
      return false;
    }
    Object.keys(value).forEach((key: string) => {
      isEq = isEq && isEqualWith(value[key], other[key], customizer);
    });
  }
  return isEq;
};

export const isError = (value: any) => value instanceof Error;

export const isFinite = (value: any) => Number.isFinite(value);

export const isFunction = (value: any) => value instanceof Function;

export const isInteger = (value: any) => Number.isInteger(value);

export const isLength = (value: any) =>
  Number.isInteger(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER;

export const isMap = (value: any) => value instanceof Map;

export const isMatch = (object: IObject, source: IObject) => {
  let isEq = true;
  if (object === source || (object !== object && source !== source)) {
    return true;
  }
  if (
    typeof object !== typeof source ||
    typeof object !== "object" ||
    Array.isArray(object) !== Array.isArray(source)
  ) {
    return false;
  }
  if (Array.isArray(source)) {
    source.forEach((item, i) => {
      isEq = isEq && isMatch(item, source[i]);
    });
  } else {
    Object.keys(source).forEach((key: string) => {
      isEq = isEq && isMatch(object[key], source[key]);
    });
  }
  return isEq;
};


export const isMatchWith = (
  object: IObject,
  source: IObject,
  customizer: Function
) => {
  let isEq = true;
  if (
    object === source ||
    customizer(object, source) ||
    (object !== object && source !== source)
  ) {
    return true;
  }
  if (
    typeof object !== typeof source ||
    typeof object !== "object" ||
    Array.isArray(object) !== Array.isArray(source)
  ) {
    return false;
  }
  if (Array.isArray(source)) {
    source.forEach((item, i) => {
      isEq = isEq && isMatchWith(item, source[i], customizer);
    });
  } else {
    Object.keys(source).forEach((key: string) => {
      isEq = isEq && isMatchWith(object[key], source[key], customizer);
    });
  }
  return isEq;
};

export const isNaN = (value: any) => (typeof value === "number" || value instanceof Number) && value != +value ;

export const isNil = (value: any) => value === undefined || value === null;

export const isNull = (value: any) => value === null;

export const isNumber = (value: any) => typeof value === "number" || value instanceof Number;

export const isObject = (value: any) => value instanceof Object;

export const isObjectLike = (value: any) =>
  value instanceof Object && typeof value === "object";

export const isPlainObject = (value: any) =>
  value?.__proto__?.constructor.name === "Object" || (typeof value === "object" && value !== null && value.__proto__ === undefined)

export const isRegExp = (value: any) => value instanceof RegExp;

export const isSageInteger = (value: any) => {
  return (
    Number.isInteger(value) &&
    value >= Number.MIN_SAFE_INTEGER &&
    value <= Number.MAX_SAFE_INTEGER
  );
};

export const isSet = (value: any) => value instanceof Set;
export const isString = (value: any) => typeof value === "string";
export const isSymbol = (value: any) => typeof value === "symbol";
export const isTypedArray = (value: any) =>
  value instanceof Uint16Array ||
  value instanceof Uint32Array ||
  value instanceof Uint8Array ||
  value instanceof Uint8ClampedArray ||
  value instanceof Int16Array ||
  value instanceof Int32Array ||
  value instanceof Int8Array ||
  value instanceof Float32Array ||
  value instanceof Float64Array ||
  value instanceof BigUint64Array ||
  value instanceof BigInt64Array ||
  value instanceof MimeTypeArray;
export const isUndefined = (value: any) => value === undefined;
export const isWeakMap = (value: any) => value instanceof WeakMap;
export const isWeakSet = (value: any) => value instanceof WeakSet;

export const lt = (value: any, other: any) => value < other;
export const lte = (value: any, other: any) => value <= other;

export const toArray = (value: any) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "object") {
    return Object.values(value);
  }
  return Array.from(value);
};
