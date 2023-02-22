import { Table } from '@shared/components';
import { useGetOrganizations } from '@modules/organization';
import { mapOrganizationsToRows } from '@modules/organization/utils/mapOrganizationsToRows';
import { useRouter } from 'next/router';
import { getHandlerTableChange } from '@modules/organization/utils/getHandlerTableChange';
import { withPagination } from '@shared/components/Table/utils/withPagination';
import { ROUTES } from '@shared/index';
import { InitialQueryParams } from '@modules/organization/ui/OrganizationsUIHelpers';
import { SetQueryParams } from '@modules/organization/ui/OrganizationsUIContext';
import { GridCell } from '@shared/components/TableGrid/types/GridCell';

export type AllOrganizationsTableProps = {
  organizations: ClientOrganization[];
  isLoading: LoadingState;
  queryParams: InitialQueryParams;
  setQueryParams: SetQueryParams;
};

export const AllOrganizationsTable = ({
  organizations,
  isLoading,
  queryParams,
  setQueryParams,
}: AllOrganizationsTableProps) => {
  const router = useRouter();

  const { total } = useGetOrganizations();

  const { headers, rows } = mapOrganizationsToRows(organizations);

  const handleRowClicked = (id: GridCell) => {
    router.push(`${ROUTES.ORGANIZATION(id.key)}`);
  };

  const handleTableChange = (type: string, queryParams: InitialQueryParams) => {
    getHandlerTableChange(setQueryParams)(type, queryParams);
  };

  const OrganizationsTable = withPagination(Table);

  return (
    <OrganizationsTable
      isLoading={isLoading}
      onRowClick={handleRowClicked}
      headers={headers}
      rows={rows}
      fixedRowHeight="74px"
      properties={queryParams}
      total={total}
      onTableChange={handleTableChange}
    />
  );
};
