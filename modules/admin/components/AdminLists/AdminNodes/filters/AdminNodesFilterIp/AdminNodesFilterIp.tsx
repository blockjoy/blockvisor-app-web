import { sortIpStringArray } from '@modules/admin/utils';
import { nodeClient } from '@modules/grpc';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterIp = ({
  isOpen,
  values,
  columnName,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<(string | undefined)[]>([]);

  const getList = async () => {
    const { nodes } = await nodeClient.listNodes(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 50000,
    });

    const ips = nodes.map((node) => node.ip);

    setList(sortIpStringArray(ips));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <AdminListFilterControl
      isOpen={isOpen}
      columnName={columnName}
      items={
        list?.map((item) => ({
          id: item!,
          name: item,
        }))!
      }
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
