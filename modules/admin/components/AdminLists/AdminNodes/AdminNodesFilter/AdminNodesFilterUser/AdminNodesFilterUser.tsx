import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  adminSelectors,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { useRecoilValue } from 'recoil';

export const AdminNodesFilterUser = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings['nodes']?.columns ?? [];

  const blockchainFilters = settingsColumns.find(
    (column) => column.name === 'blockchainName',
  )?.filterSettings?.values;

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.filter(
        (node) =>
          !!node.createdBy?.name &&
          (!blockchainFilters?.length ||
            blockchainFilters?.includes(node.blockchainId)),
      )
      ?.map(({ createdBy }) => ({
        id: createdBy?.resourceId,
        name: createdBy?.name,
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
