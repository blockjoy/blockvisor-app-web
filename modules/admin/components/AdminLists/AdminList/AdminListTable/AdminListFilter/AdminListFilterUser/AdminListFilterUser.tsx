import { organizationClient, userClient } from '@modules/grpc';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterUser = ({ values, onChange }: Props) => {
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
      items={
        list?.map((item) => ({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
