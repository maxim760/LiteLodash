import { IArrayTwo } from "../../types";

export const difference: IArrayTwo = (array, array2) => {
  return array.filter(item => !array2.includes(item))
}

// console.log(difference([2, 1,4], [2, 3,1,4]))
// console.log(difference([2, 1], [2, 3]))