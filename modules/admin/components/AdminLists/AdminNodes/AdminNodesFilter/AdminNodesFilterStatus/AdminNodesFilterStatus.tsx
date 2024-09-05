import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { getNodeStatusInfo, sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';
import { NodeStatus } from '@modules/grpc/library/blockjoy/common/v1/node';

export const AdminNodesFilterStatus = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.filter((node) => node.status !== NodeStatus.NODE_STATUS_UNSPECIFIED)
      ?.map(({ status }) => ({
        id: status?.toString(),
        name: capitalize(getNodeStatusInfo(status).name?.toLocaleLowerCase()!),
      }));

    const extraFields: AdminFilterDropdownItem[] = [
      {
        id: NodeStatus.NODE_STATUS_DELETED?.toString(),
        name: 'Deleted',
      },
      {
        id: NodeStatus.NODE_STATUS_DELETE_PENDING?.toString(),
        name: 'Deleted Pending',
      },
      {
        id: NodeStatus.NODE_STATUS_DELETING?.toString(),
        name: 'Deleting',
      },
    ];

    all.push(...extraFields);

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
