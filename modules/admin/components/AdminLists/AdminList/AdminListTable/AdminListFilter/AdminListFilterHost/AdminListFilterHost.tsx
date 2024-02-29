import { hostClient, organizationClient } from '@modules/grpc';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterHost = ({ values, onChange }: Props) => {
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
      items={
        list?.map((item) => ({
          id: item.id,
          name: item.name,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
