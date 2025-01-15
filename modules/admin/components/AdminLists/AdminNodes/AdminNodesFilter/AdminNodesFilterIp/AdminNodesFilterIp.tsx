import { sortIpStringArray } from '@modules/admin/utils';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { AdminFilterControlProps } from '@modules/admin/types/AdminFilterControlProps';

export const AdminNodesFilterIp = ({
  isOpen,
  values,
  columnName,
  listAll,
  onFilterChange,
}: AdminFilterControlProps<Node>) => {
  const [list, setList] = useState<AdminFilterDropdownItem[]>([]);

  useEffect(() => {
    const ips = Array.from(
      new Set(sortIpStringArray(listAll?.map((node) => node.ipAddress)!)),
    );
    setList(ips.map((ip) => ({ id: ip, name: ip })));
  }, [listAll]);

  return (
    <AdminListFilterControl
      isOpen={isOpen}
      columnName={columnName}
      items={list}
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
