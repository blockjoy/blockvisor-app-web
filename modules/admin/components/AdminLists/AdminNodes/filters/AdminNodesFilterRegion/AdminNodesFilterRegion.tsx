import { nodeClient } from '@modules/grpc';
import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterRegion = ({
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

    const regions = Array.from(
      new Set(
        sort(
          nodes
            .filter((node) => node.placement?.scheduler?.region)
            .map((node) => node.placement?.scheduler?.region),
        ),
      ),
    );

    setList(regions);
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
