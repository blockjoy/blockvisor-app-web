import { hostClient } from '@modules/grpc';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterHost = ({
  columnName,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<Host[]>();

  const getList = async () => {
    const response = await hostClient.listHosts(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 10000,
    });
    setList(response.hosts);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  return (
    <AdminListFilterControl
      columnName={columnName}
      items={
        list?.map((item) => ({
          id: item.id,
          name: item.name,
        }))!
      }
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
