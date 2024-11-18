import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  adminSelectors,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { sort } from '@shared/components';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const AdminNodesFilterHost = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const protocolFilters = settingsColumns.find(
    (column) => column.name === 'protocolName',
  )?.filterSettings?.values;

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.filter(
        (node) =>
          !protocolFilters?.length ||
          protocolFilters?.includes(node.protocolId),
      )
      ?.map(({ hostId, hostDisplayName }) => ({
        id: hostId,
        name: hostDisplayName,
      }));
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
