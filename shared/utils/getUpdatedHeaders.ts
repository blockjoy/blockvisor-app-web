export const getUpdatedHeaders = <T extends string>(
  headers: TableHeader<T>[],
  filteredHeaders: TableHeader<T>[],
  movingIndex: number,
  targetIndex: number,
): TableHeader<T>[] => {
  const movingKey = filteredHeaders[movingIndex].key;
  const targetKey = filteredHeaders[targetIndex].key;

  const originalPositions: Record<string, number> = {};
  headers.forEach((header, i) => {
    originalPositions[header.key] = i + 1;
  });

  const movingPosition = headers.findIndex((h) => h.key === movingKey);
  const targetPosition = headers.findIndex((h) => h.key === targetKey);

  const newHeaders = [...headers];

  const [movedColumn] = newHeaders.splice(movingPosition, 1);

  newHeaders.splice(targetPosition, 0, movedColumn);

  const newPositions: Record<string, number> = {};
  newHeaders.forEach((header, i) => {
    newPositions[header.key] = i + 1;
  });

  const updatedColumns = [];
  for (const key in originalPositions) {
    if (originalPositions[key] !== newPositions[key]) {
      updatedColumns.push({ key: key as T, order: newPositions[key] });
    }
  }

  return updatedColumns;
};
