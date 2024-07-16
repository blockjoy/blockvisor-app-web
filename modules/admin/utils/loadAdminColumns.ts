export const loadAdminColumns = (
  columns: AdminListColumn[],
  settingsColumns: AdminListColumn[],
) => {
  let columnsCopy = columns;

  if (settingsColumns) {
    columnsCopy.forEach((column) => {
      const foundSettingsColumn = settingsColumns?.find(
        (c) => c?.name === column?.name,
      );

      if (foundSettingsColumn) {
        if (foundSettingsColumn.isVisible !== undefined) {
          column.isVisible = foundSettingsColumn.isVisible;
        }

        if (column.filterComponent) {
          if (!column.filterSettings) column.filterSettings = {};

          column.filterSettings.values =
            foundSettingsColumn.filterSettings?.values!;
        }
      }
    });
  }

  return columnsCopy;
};
