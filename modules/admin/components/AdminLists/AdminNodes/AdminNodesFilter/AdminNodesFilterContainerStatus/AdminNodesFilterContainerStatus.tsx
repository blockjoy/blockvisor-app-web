import { useEffect, useState } from 'react';
import {
  AdminListFilterControl,
  dedupedAdminDropdownList,
} from '@modules/admin';
import { getNodeStatusInfo, sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';
import { ContainerStatus } from '@modules/grpc/library/blockjoy/common/v1/node';

export const AdminNodesContainerStatus = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])
      ?.filter(
        (node) =>
          node.containerStatus !== ContainerStatus.CONTAINER_STATUS_UNSPECIFIED,
      )
      ?.map(({ containerStatus }) => ({
        id: containerStatus?.toString(),
        name: capitalize(
          getNodeStatusInfo(
            containerStatus,
            'container',
          ).name?.toLocaleLowerCase()!,
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
