type FilterItem = { id?: string; name?: string; ip?: string };

export const filterData = <T extends FilterItem>(
  data: T[],
  searchQuery: string,
): T[] => {
  const queryWords = searchQuery.toLowerCase().split(' ');

  const isHost = data?.[0]?.hasOwnProperty('os');

  if (isHost) {
    return data.filter((item: T) => {
      return queryWords.some((queryWord) => {
        const word = queryWord.toLowerCase();
        const hasId = item?.id?.toLowerCase().includes(word);
        const hasName = item?.name?.toLowerCase().includes(word);
        const hasIp = item?.ip?.toLowerCase().includes(word);

        return hasId || hasName || hasIp;
      });
    });
  }

  return data.filter((item: T) => {
    const itemLower = item?.name?.toLowerCase();
    return queryWords.every((queryWord) => itemLower?.includes(queryWord));
  });
};
