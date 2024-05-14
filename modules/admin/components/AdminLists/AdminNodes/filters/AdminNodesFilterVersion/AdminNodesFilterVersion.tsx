import { sortVersionStringArray } from '@modules/admin/utils';
import { nodeClient } from '@modules/grpc';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterVersion = ({
  columnName,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<(string | undefined)[]>([]);

  const getList = async () => {
    const { nodes } = await nodeClient.listNodes(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 50000,
    });

    const versions = sortVersionStringArray(
      Array.from(new Set(nodes.map((node) => node.version))),
    );

    setList(versions);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <AdminListFilterControl
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
