export const getOrderedColumns = <
  T extends { key: string },
  C extends TableColumn,
>(
  currentItems: T[],
  newItems: T[],
): C[] => {
  const indexesMap = new Map<string, number>();
  currentItems.forEach((item, index) => indexesMap.set(item.key, index));

  const updatedColumns = newItems
    .map((item, i): C | null => {
      const currentItemIndex = indexesMap.get(item.key);

      if (i === currentItemIndex) return null;

      return { key: item.key, order: i } as C;
    })
    .filter((item): item is C => item !== null);

  return updatedColumns;
};
