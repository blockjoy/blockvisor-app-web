export const loadAdminColumns = (name: string, columns: AdminListColumn[]) => {
  const localStorageColumns: AdminListColumn[] = JSON.parse(
    localStorage.getItem(`${name}Columns`)!,
  );

  let columnsCopy = [...columns];
  let localStorageColumnsCopy = localStorageColumns
    ? [...localStorageColumns]
    : [];

  if (localStorageColumns) {
    columnsCopy.forEach((column) => {
      const isVisible = localStorageColumns?.find(
        (c: AdminListColumn) => c.name === column.name,
      )?.isVisible;

      column.isVisible = isVisible;

      if (column.filterSettings) {
        const foundLocalStorage = localStorageColumnsCopy?.find(
          (filter) =>
            filter.filterSettings?.type === column.filterSettings?.type,
        );
        column.filterSettings.values =
          foundLocalStorage?.filterSettings?.values!;
      }
    });
  }

  return columnsCopy;
};
