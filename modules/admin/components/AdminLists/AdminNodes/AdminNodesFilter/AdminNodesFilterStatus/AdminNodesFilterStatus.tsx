import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { getNodeStatusInfo, sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';
import { NodeState } from '@modules/grpc/library/blockjoy/common/v1/node';

export const AdminNodesFilterStatus = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps<Node>) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  useEffect(() => {
    const all = listAll
      ?.filter(
        (node) => node.nodeStatus?.state !== NodeState.NODE_STATE_UNSPECIFIED,
      )
      ?.map((node) => ({
        id: node.nodeStatus?.state,
        name: capitalize(
          getNodeStatusInfo(node.nodeStatus?.state!)?.name?.toLowerCase()!,
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
