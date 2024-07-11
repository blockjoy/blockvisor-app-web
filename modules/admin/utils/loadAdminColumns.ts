export const loadAdminColumns = (
  columns: AdminListColumn[],
  settingsColumns: AdminListColumn[],
) => {
  let columnsCopy = [...columns];
  let settingsColumnsCopy = [...settingsColumns];

  if (settingsColumnsCopy) {
    columnsCopy.forEach((column) => {
      const isVisible = settingsColumnsCopy?.find(
        (c: AdminListColumn) => c.name === column.name,
      )?.isVisible;

      column.isVisible = isVisible;

      const foundSettingsColumn = settingsColumnsCopy?.find(
        (c) => c?.name === column?.name,
      );

      if (foundSettingsColumn) {
        column.isVisible = foundSettingsColumn.isVisible;

        if (!column.filterSettings) {
          column.filterSettings = {};
        }

        column.filterSettings.values =
          foundSettingsColumn.filterSettings?.values!;
      }
    });
  }

  return columnsCopy;
};
