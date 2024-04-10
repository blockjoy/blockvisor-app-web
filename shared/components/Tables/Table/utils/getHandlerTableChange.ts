export function getHandlerTableChange(setQueryParams: any) {
  return (
    type: string,
    payload: {
      sort: any;
      pagination: Pagination;
      filter: any;
    },
  ) => {
    setQueryParams((prev: any) => {
      switch (type) {
        case 'sort':
          const { sort } = payload;
          return {
            ...prev,
            sort: [
              {
                field: sort[0]?.field,
                order: sort[0]?.order,
              },
            ],
          };
        case 'pagination':
          const {
            pagination: { currentPage, itemsPerPage },
          } = payload;
          return {
            ...prev,
            pagination: {
              ...prev.pagination,
              currentPage,
              itemsPerPage,
            },
          };
        case 'filter':
          const { filter } = payload;
          return {
            ...prev,
            filter: {
              ...prev.filter,
              ...filter,
            },
          };

        default:
          return prev;
      }
    });
  };
}
