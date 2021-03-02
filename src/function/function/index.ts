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
  return (...args: any[]) => func(...partials.concat(args));
};
export const partialRight = (func: Function, ...partials: any[]) => {
  return (...args: any[]) => func(...args.concat(partials));
};

export const rearg = (func: Function, ...rest: any) => {
  const indexes = rest.flat(); // 1,2,3 => [1,2,3], [1,2,3] => [[1,2,3]], поэтому flat
  return (...args: any) => {
    return func(...indexes.map((idx: number) => args[idx]));
  };
};

export const rest = (func: Function, start: number = func.length - 1) => {
  return (...args: any[]) => {
    const nonRest = args.slice(0, func.length - 1);
    const restParams = args.slice(start);
    return func(...nonRest, restParams);
  };
};

export const spread = (func: Function, start: number = 0) => {
  return (...args: any[]) => {
    return func(...args.flat().slice(start));
  };
};

export const throttle = (func: Function, wait: number) => {
  let lastTime = 0;
  return () => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func();
      lastTime = now;
    }
  };
};

export const unary = (func: Function) => {
  return (first: any): void => {
    return func(first);
  };
};

export const wrap = (value: Function, wrapper: Function) => {
  // return (...args: any[]) => {
  //   value.apply(null, args)
  // }
  return (...args: any) => wrapper(value,...args)
}









