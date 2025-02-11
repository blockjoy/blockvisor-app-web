import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';
import { unique } from '@shared/index';
import { sort } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';
import { capitalize } from 'utils/capitalize';

export const AdminNodesFilterProtocol = ({
  columnName,
  values,
  listAll,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<AdminFilterDropdownItem[] | undefined>();

  useEffect(() => {
    const all: AdminFilterDropdownItem[] | undefined = (listAll as Node[])?.map(
      ({ protocolId, versionKey }) => ({
        id: protocolId,
        name: capitalize(versionKey?.protocolKey!),
      }),
    );
    setList(sort(unique(all!, 'id'), { field: 'name' }));
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
