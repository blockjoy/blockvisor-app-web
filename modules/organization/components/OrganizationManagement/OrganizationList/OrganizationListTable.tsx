import { Table } from '@shared/components';
import { organizationAtoms } from '@modules/organization';
import { mapOrganizationsToRows } from '@modules/organization/utils/mapOrganizationsToRows';
import { useRouter } from 'next/router';
import { getHandlerTableChange } from '@modules/organization/utils/getHandlerTableChange';
import { withQuery } from '@shared/components/Table/utils/withQuery';
import { ROUTES } from '@shared/index';
import {
  FILTERS,
  InitialQueryParams,
} from '@modules/organization/ui/OrganizationsUIHelpers';
import { SetQueryParams } from '@modules/organization/ui/OrganizationsUIContext';
import { GridCell } from '@shared/components/TableGrid/types/GridCell';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useIdentity } from '@modules/auth';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';

export type AllOrganizationsTableProps = {
  organizations: Org[];
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

  const { user } = useIdentity();

  const setOrganizationsFilters = useSetRecoilState(
    organizationAtoms.organizationsFilters,
  );

  const organizationsActiveCount = useRecoilValue(
    organizationAtoms.organizationsFiltered(queryParams),
  ).length;

  const { headers, rows } = mapOrganizationsToRows(organizations, user?.id!);

  const handleRowClicked = (id: GridCell) => {
    router.push(`${ROUTES.ORGANIZATION(id.key)}`);
  };

  const handleTableChange = (type: string, queryParams: InitialQueryParams) => {
    getHandlerTableChange(setQueryParams)(type, queryParams);
    setOrganizationsFilters(queryParams);
  };

  const OrganizationsTable = withQuery(Table);

  return (
    <OrganizationsTable
      isLoading={isLoading}
      onRowClick={handleRowClicked}
      headers={headers}
      rows={rows}
      fixedRowHeight="74px"
      properties={queryParams}
      total={organizationsActiveCount}
      onTableChange={handleTableChange}
      // filters={FILTERS}
      tableDataCy="organizationsList-table"
    />
  );
};
