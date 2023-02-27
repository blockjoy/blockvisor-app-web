export const sort = (items: any, sorting: Sorting) => {
  return [...items].sort((a: ClientOrganization, b: ClientOrganization) => {
    let aField = a[sorting.field!];
    let bField = b[sorting.field!];

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
