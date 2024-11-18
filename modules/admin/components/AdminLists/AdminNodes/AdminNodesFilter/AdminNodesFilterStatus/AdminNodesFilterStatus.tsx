import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { getNodeStatusInfo, sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';
import {
  NodeState,
  NodeStatus,
} from '@modules/grpc/library/blockjoy/common/v1/node';

export const AdminNodesFilterStatus = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.filter(
        (node) => node.nodeStatus?.state !== NodeState.NODE_STATE_UNSPECIFIED,
      )
      ?.map(({ nodeStatus }) => ({
        id: status?.toString(),
        name: capitalize(getNodeStatusInfo(nodeStatus?.state!)?.toString()!),
      }));

    const extraFields: AdminFilterDropdownItem[] = [
      {
        id: NodeState.NODE_STATE_DELETED?.toString(),
        name: 'Deleted',
      },
      {
        id: NodeState.NODE_STATE_DELETING?.toString(),
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
