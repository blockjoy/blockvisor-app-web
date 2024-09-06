import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { getNodeStatusInfo, sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';
import { SyncStatus } from '@modules/grpc/library/blockjoy/common/v1/node';

export const AdminNodesSyncStatus = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])

      ?.filter((node) => node.syncStatus !== SyncStatus.SYNC_STATUS_UNSPECIFIED)
      ?.map(({ syncStatus }) => ({
        id: syncStatus?.toString(),
        name: capitalize(
          getNodeStatusInfo(syncStatus, 'sync').name?.toLocaleLowerCase()!,
        ),
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
