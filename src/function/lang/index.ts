import { Buffer } from "buffer";

export const castArray = (...args: any) => {
  console.log(args);
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
    typeof value === "object" && ((value?.length ?? value?.size ?? undefined) !== undefined)
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
      return false
    }
    value.forEach((item, i) => {
      isEq = isEq && isEqual(item, other[i]);
    });
  } else {
    if (Object.keys(value).length !== Object.keys(other).length) {
      return false
    }
    Object.keys(value).forEach((key: string) => {
      isEq = isEq && isEqual(value[key], other[key])
    })
  }
  return isEq;
};
