import { Pagination } from '@modules/organization/ui/OrganizationsUIHelpers';

export const paginate = (items: any, pagination: Pagination) => {
  const { currentPage, itemsPerPage } = pagination;

  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  const paginatedRows = items.slice(start, end);

  return paginatedRows;
};
