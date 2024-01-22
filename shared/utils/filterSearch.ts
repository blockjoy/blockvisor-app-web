type FilterItem = { id?: string; name?: string; ip?: string };

export const filterSearch = <T extends FilterItem>(
  items: T[],
  searchQuery: string,
): T[] => {
  const queryWords = searchQuery.toLowerCase().split(' ');

  const isHost = items?.[0]?.hasOwnProperty('os');

  if (isHost) {
    return items.filter((item: T) => {
      return queryWords.every((queryWord) => {
        const word = queryWord.toLowerCase();
        const hasId = item?.id?.toLowerCase() === word;
        const hasName = item?.name?.toLowerCase().includes(word);
        const hasIp = item?.ip?.toLowerCase().includes(word);

        return hasId || hasName || hasIp;
      });
    });
  }

  return items.filter((item: T) => {
    const itemLower = item?.name?.toLowerCase();
    return queryWords.every((queryWord) => itemLower?.includes(queryWord));
  });
};
