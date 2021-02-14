import {  IArrayTwoAndFunc } from "../../types";

export const differenceWith: IArrayTwoAndFunc = (array, array2, compare) => {
  
  return array.filter(item => {
    return !array2.some(compareItem => compare(compareItem,item))
  })
}

const arrs1 = [1,2,3,4]
const arrs2 = [1, 2, 3, 5, 6, 7]

// console.log(differenceWith(arrs1,arrs2, (a: any,b: any) => a === b))
