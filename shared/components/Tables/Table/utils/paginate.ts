export const paginate = (items: any, pagination: Pagination) => {
  const { currentPage = 1, itemsPerPage = 8 } = pagination;

  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  const paginatedRows = items.slice(start, end);

  return paginatedRows;
};
