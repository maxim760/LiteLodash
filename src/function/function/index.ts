import { Nullish } from "@testing-library/react";

export function after(n: number, func: any) {
  let count = 0;
  return () => {
    count++;
    return count >= n ? func() : undefined;
  };
}

export const ary = (n: number, func: Function) => {
  return (...args: any[]): void => {
    return func.apply(null, args.slice(0, n));
  };
};
export function before(n: number, func: any) {
  let count = 0;
  return () => {
    count++;
    return count < n ? func() : undefined;
  };
}

export const bind = (func: Function, thisArg: any, ...partials: any[]) => {
  return (...args2: any) => {
    return func.apply(thisArg, partials.concat(args2));
  };
};

export const bindKey = (
  object: { [key: string]: any },
  key: string,
  ...partials: any[]
) => {
  return (...args2: any) => {
    return object[key].apply(object, partials.concat(args2));
  };
};

export const curry = (func: Function) => {
  return function curried(...args: any) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return (...args2: any[]) => {
        return curried(...args.concat(args2));
      };
    }
  };
};
export const curryRight = (func: Function) => {
  return function curried(...args: any[]) {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...args2: any[]) => {
      return curried(...args2.concat(args));
    };
  };
};

export const debounce = (func: Function, wait: number) => {
  let timer: Nullish<NodeJS.Timeout>;
  return (...args: any[]) => {
    clearTimeout(timer!);
    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, wait);
  };
};

// const debounced1 = debounce(() => console.log("1 дебаунс: 1 раз"), 1000);
// const debounced2 = debounce(() => console.log("2 дебаунс: 2 раза"), 1000);
// debounced1()
// debounced2()
// setTimeout(debounced1, 200)
// setTimeout(debounced2, 2000)

export const defer = (func: Function, ...args: any[]) => {
  return setTimeout(() => func(...args), 1);
};
// defer(function (text: string) {
//   console.log(text);
// }, "deferred");

export const delay = (func: Function, ms: number, ...args: any[]) => {
  return setTimeout(() => func(...args), ms);
};

// delay(function(text: string) {
//   console.log(text);
// }, 1000, 'later');

export const flip = (func: Function) => {
  return (...args: any) => {
    return func(...[...args].reverse());
  };
};

export const negate = (func: Function) => {
  return (...args: any[]) => !func(...args);
};

export const once = (func: Function) => {
  let count = 0;
  let res: any;
  return (...args: any[]) => {
    count++;
    if (count === 1) {
      res = func(...args);
      console.log(res);
    }
    return res;
  };
};

export const overArgs = (func: Function, transform: any) => {
  const changeAr: Function[] = [].concat(transform); // 22 => [22], [22] => [22]
  return (...args: any[]) => {
    const res: any = func(...args);
    return Array.isArray(res)
      ? res.map((item, i) =>
          changeAr[i] ? changeAr[i](item) : changeAr[0](item)
        )
      : changeAr[0](res);
  };
};

export const partial = (func: Function, ...partials: any[]) => {
  return (...args: any[]) => func(...partials.concat(args))
}
export const partialRight = (func: Function, ...partials: any[]) => {
  return (...args: any[]) => func(...args.concat(partials))
}

