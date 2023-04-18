export const arraysEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }
  const setA = new Set(a);
  for (const element of b) {
    if (!setA.has(element)) {
      return false;
    }
  }
  return true;
};
