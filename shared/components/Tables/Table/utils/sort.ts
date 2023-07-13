export const sort = (items: any, sorting: Sorting) => {
  return [...items].sort((a: any, b: any) => {
    let aField = a[sorting.field!] || a;
    let bField = b[sorting.field!] || b;

    if (typeof aField === 'string' && typeof bField === 'string') {
      aField = aField.toLowerCase();
      bField = bField.toLowerCase();

      return sorting.order === 'asc'
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    }

    return sorting.order === 'asc'
      ? aField > bField
        ? 1
        : -1
      : bField > aField
      ? 1
      : -1;
  });
};
