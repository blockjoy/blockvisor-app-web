export const filterData = <T extends { id?: string; name?: string }>(
  data: T[],
  searchQuery: string,
): T[] => {
  const queryWords = searchQuery.toLowerCase().split(' ');

  return data.filter((item: T) => {
    const itemLower = item?.name?.toLowerCase();
    return queryWords.every((queryWord) => itemLower?.includes(queryWord));
  });
};
