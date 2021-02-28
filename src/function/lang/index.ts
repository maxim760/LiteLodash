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
  const res = deepCopy(value)
  if (!customizer) {
    return res
  }
  if (typeof value !== "object") {
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item ,i , array) => customizer(item, i, array))
  }
  return Object.values(value).map((item, i) => customizer(item, i, value))
  // не полностью понял как именно работает customizer
}
export const cloneWith = (value: any, customizer: any) => {
  customizer = typeof customizer === "function" ? customizer : undefined;
  const shallowCopy = (item: any) =>
    Array.isArray(item)
      ? [...item]
      : typeof item === "object"
        ? { ...item }
        : item;
  const res = shallowCopy(value)
  if (!customizer) {
    return res
  }
  if (typeof value !== "object") {
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item ,i , array) => customizer(item, i, array))
  }
  return Object.values(value).map((item, i) => customizer(item, i, value))
  // не полностью понял как именно работает customizer
}



