const getByPath = (path: string, accInitial: any = {}, finalRes: any) => {
  let obj: any = null;
  let curString = "";
  path.split("").reduce((acc: any, sym: any, i, arr) => {
    if (!obj) {
      obj = acc;
    }
    const str = curString;
    if (sym === ".") {
      if (!acc[str]) {
        acc[str] = {};
      }

      curString = "";
      return acc[str];
    } else if (sym === "[") {
      if (!acc[str]) {
        acc[str] = [];
      }
      curString = "";
      return acc[str];
    } else if (sym === "]") {
      if (!acc[+str]) {
        acc[+str] = undefined;
      }
      return acc;
    }
    if (i === arr.length - 1) {
      curString += sym;
      if (!acc[curString]) {
        acc[curString] = finalRes;
      }
      return acc[curString];
    } else {
      curString += sym;
      return acc;
    }
  }, accInitial);
  return obj;
};

export const zipObjectDeep = (keyArray: any[], valueArray: any[]) => {
  return keyArray.reduce((acc, value, i) => {
    const obj = getByPath(value, acc, valueArray[i]);

    return obj;
  }, {});
};

// console.log(zipObjectDeep(["a.b[0].c", "a.b[1].d"], [1, 2]));
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
// это как то заработало !!! Да это какой-то костыль