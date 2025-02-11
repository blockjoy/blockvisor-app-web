export const unique = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set<T[keyof T]>();

  return array.filter((item) => {
    const value = item[key];

    if (seen.has(value)) return false;

    seen.add(value);

    return true;
  });
};
