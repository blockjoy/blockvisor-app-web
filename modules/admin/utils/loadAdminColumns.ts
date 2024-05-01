import { AdminListColumn } from '../types/AdminListColumn';

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

      const foundLocalStorage = localStorageColumnsCopy?.find(
        (c) => c?.name === column?.name,
      );

      column.filterSettings = foundLocalStorage?.filterSettings || {};

      column.filterSettings.values = foundLocalStorage?.filterSettings?.values!;
    });
  }

  return columnsCopy;
};
