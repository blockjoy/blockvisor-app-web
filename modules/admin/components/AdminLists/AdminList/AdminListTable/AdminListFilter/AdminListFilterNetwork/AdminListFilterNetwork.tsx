import { nodeClient } from '@modules/grpc';
import { sort } from '@shared/components';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterNetwork = ({ values, onChange }: Props) => {
  const [list, setList] = useState<(string | undefined)[]>([]);

  const getList = async () => {
    const { nodes } = await nodeClient.listNodes(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 50000,
    });

    const networks = Array.from(
      new Set(sort(nodes.map((node) => node.network))),
    );

    setList(networks);
  };

  useEffect(() => {
    getList();
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
