export function getHandlerTableChange(setQueryParams: any) {
  return (
    type: string,
    {
      pagination: { currentPage, itemsPerPage },
      sorting: { order, field },
      filtering,
    }: any,
  ) => {
    setQueryParams((prev: any) =>
      type === 'sort'
        ? {
            ...prev,
            sorting: {
              ...prev.sorting,
              field,
              order,
            },
          }
        : type === 'pagination'
        ? {
            ...prev,
            pagination: {
              ...prev.pagination,
              currentPage,
              itemsPerPage,
            },
          }
        : type === 'filter'
        ? {
            ...prev,
            filtering: {
              ...prev.filtering,
              ...filtering,
            },
          }
        : prev,
    );
  };
}
