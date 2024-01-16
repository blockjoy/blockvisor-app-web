export const createDropdownValuesFromEnum = (list: any, prefix: string) =>
  Object.entries(list)
    .filter((f) => +f[0] > 0)
    .map(([id, name]) => ({
      id: id?.toString(),
      name: String(name).toString().replace(prefix, '').toLocaleLowerCase(),
    }));
