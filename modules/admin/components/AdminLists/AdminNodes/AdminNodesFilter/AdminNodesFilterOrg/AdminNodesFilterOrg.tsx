import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';

export const AdminNodesFilterOrg = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<Org[]>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.map(({ orgId, orgName }) => ({
        id: orgId,
        name: orgName,
      }))
      ?.filter((org) => org.name !== 'Personal');
    setList(sort(dedupedAdminDropdownList(all!), { field: 'name' }));
  }, [listAll]);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
