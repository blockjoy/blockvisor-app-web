export const updateTableColumns = (
  oldColumns: TableColumn[],
  newColumns: TableColumn[],
  callback?: (columns: TableColumn[]) => void,
) => {
  const updatedColumns = [...oldColumns];

  newColumns.forEach((column) => {
    const index = updatedColumns.findIndex((col) => col.key === column.key);

    if (index !== -1) {
      updatedColumns[index] = { ...updatedColumns[index], ...column };
    } else {
      updatedColumns.push({ ...column });
    }
  });

  callback?.(updatedColumns);
};
