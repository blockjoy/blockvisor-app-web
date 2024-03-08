import { hostClient, nodeClient } from '@modules/grpc';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterRegion = ({ values, onChange }: Props) => {
  const [list, setList] = useState<(string | undefined)[]>([]);

  const getList = async () => {
    const { nodes } = await nodeClient.listNodes(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 50000,
    });

    console.log('regions nodes', nodes);

    const regions = Array.from(
      new Set(
        nodes
          .filter((node) => node.placement?.scheduler?.region)
          .map((node) => node.placement?.scheduler?.region),
      ),
    );

    console.log('regions', regions);

    setList(regions);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  return (
    <AdminListFilterControl
      items={
        list?.map((item) => ({
          id: item!,
          name: item,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
