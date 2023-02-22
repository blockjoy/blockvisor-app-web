import { Pagination } from '@modules/organization/ui/OrganizationsUIHelpers';

export const paginate = (
  organizations: ClientOrganization[],
  pagination: Pagination,
) => {
  const { currentPage, itemsPerPage } = pagination;

  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  const paginatedRows = organizations.slice(start, end);

  return paginatedRows;
};
