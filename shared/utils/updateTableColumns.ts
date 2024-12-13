export const updateTableColumns = (
  oldColumns: TableColumn[],
  newColumns: TableColumn[],
  callback?: (columns: TableColumn[]) => void,
) => {
  const columnsMap = new Map<string, TableColumn>();

  for (const column of oldColumns) {
    const { key, ...rest } = column;
    if (!key) continue;

    columnsMap.set(key, rest);
  }

  for (const column of newColumns) {
    const { key, ...rest } = column;
    if (!key) continue;

    const currentCol = columnsMap.get(key) ?? {};
    columnsMap.set(key, { ...currentCol, ...rest });
  }

  const updatedColumns = Array.from(columnsMap, ([key, col]) => ({
    key,
    ...col,
  }));

  callback?.(updatedColumns);
};
