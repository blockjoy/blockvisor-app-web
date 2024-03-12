export const sort = (items: any, sorting?: Sorting) => {
  return [...items].sort((a: any, b: any) => {
    let aField = a[sorting?.field!] || a;
    let bField = b[sorting?.field!] || b;

    const sortOrder = sorting?.order || 'asc';

    if (typeof aField === 'string' && typeof bField === 'string') {
      aField = aField.toLowerCase();
      bField = bField.toLowerCase();

      return sortOrder === 'asc'
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    }

    return sortOrder === 'asc'
      ? aField > bField
        ? 1
        : -1
      : bField > aField
      ? 1
      : -1;
  });
};
