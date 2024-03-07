import { hostClient } from '@modules/grpc';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterRegion = ({ values, onChange }: Props) => {
  const [list, setList] = useState<Region[]>();

  const getList = async () => {
    const response = await hostClient.listRegions();
    setList(response);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  return (
    <AdminListFilterControl
      items={
        list?.map((item) => ({
          id: item.name!,
          name: item.name,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
