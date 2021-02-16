export const sortedUniqBy = (array: any[], func: any): any => {
  const getRes = (item: any) => typeof func === "function" ? func(item) : item[func] 
  return array.reduce((acc: any[], value) => {
    if (!acc.some(item => getRes(item) === getRes(value))) {
      acc.push(value)
    }
    return acc
  }, [])
}

// console.log(sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor));
