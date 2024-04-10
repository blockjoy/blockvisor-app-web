export const filter = (items: any, filter: any) => {
  const filteredRows = items.filter((i: any) => {
    const filters: any = Object.fromEntries(
      Object.entries(filter).filter(
        ([_, filterData]: any) =>
          filterData?.value !== null && filterData.value !== '',
      ),
    );

    const isFiltered = Object.keys(filters).length;
    if (!isFiltered) return true;

    for (let key in filters) {
      const itemValueByKey = filters[key].dataField
        .split('.')
        .reduce((acc: any, key: string) => acc[key], i);

      if (filters[key].value != itemValueByKey) {
        return false;
      }
    }

    return true;
  });

  return filteredRows;
};
