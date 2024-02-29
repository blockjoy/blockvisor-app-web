export const createAdminFilterList = (
  filters: AdminListColumn[],
  name: string,
) =>
  filters?.find((filter) => filter.filterSettings?.name === name)
    ?.filterSettings?.values;
