export const sort = (items: any, sorting: Sorting) => {
  return [...items].sort((a: ClientOrganization, b: ClientOrganization) => {
    let aField = a[sorting.field!].toLowerCase();
    let bField = b[sorting.field!].toLowerCase();

    return sorting.order === 'asc'
      ? aField.localeCompare(bField)
      : bField.localeCompare(aField);
  });
};
