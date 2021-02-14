import {  IArrayTwoAndFunc } from "../../types";

export const differenceBy: IArrayTwoAndFunc = (array, array2, func) => {
  
  const compare = (item: any) => typeof func === "function" ? func(item) : item[func] 
  const check = (item: any) => compare(item) ? compare(item) : compare(item.toString()) 
  return array.filter(item => {
    return !array2.some(compareItem => check(compareItem) === check(item))
  })
}

// console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor))
// console.log(differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'))