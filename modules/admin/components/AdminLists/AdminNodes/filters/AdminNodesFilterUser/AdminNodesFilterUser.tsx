import { userClient } from '@modules/grpc';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterUser = ({
  columnName,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
  const [list, setList] = useState<User[]>();

  const getList = async () => {
    const response = await userClient.listUsers(undefined, {
      currentPage: 0,
      itemsPerPage: 10000,
    });
    setList(response.users);
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
          name: `${item.firstName} ${item.lastName}`,
        }))!
      }
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
