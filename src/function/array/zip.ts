export const zip = (...arrays: any[]) => {
  const nestedLen = Math.max(...arrays.map((ar) => ar.length));
  return arrays.reduce((acc, value: any[], idxZip) => {
    for (let i = 0; i < nestedLen; i++) {
      if (!acc[i]) acc[i] = []
      acc[i][idxZip] = value[i] ?? undefined
    }
    return acc;
  }, []);
};

// console.log(zip(["a", "b"], [1, 2], [true, false]));
// => [['a', 1, true], ['b', 2, false]]
