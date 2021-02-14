export const compact = (array: any[]) :any[] => {
  return array.filter(item => item)
}

// console.log(compact([0, 1, false, 2, '', 3]))