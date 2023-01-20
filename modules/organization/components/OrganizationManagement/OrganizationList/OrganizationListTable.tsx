import { EmptyColumn, Table, TableSkeleton } from '@shared/components';
import { FC } from 'react';
import { useGetOrganizations } from '@modules/organization';
import { mapOrganizationsToRows } from '@modules/organization/utils/mapOrganizationsToRows';
import { useRouter } from 'next/router';

export const AllOrganizationsTable: FC = () => {
  const router = useRouter();

  const { organizations, isLoading } = useGetOrganizations();
  const { headers, rows } = mapOrganizationsToRows(organizations);

  const handleRowClicked = (id: any) => {
    router.push(`organizations/${id.key}`);
  };

  return isLoading === 'initializing' ? (
    <TableSkeleton />
  ) : !Boolean(rows?.length) && isLoading === 'finished' ? (
    <EmptyColumn
      id="js-nodes-empty"
      title="No organizations"
      description={'Add your first organization'}
    />
  ) : (
    <Table
      isLoading={isLoading}
      onRowClick={handleRowClicked}
      headers={headers}
      rows={rows}
      fixedRowHeight="74px"
    />
  );
};
