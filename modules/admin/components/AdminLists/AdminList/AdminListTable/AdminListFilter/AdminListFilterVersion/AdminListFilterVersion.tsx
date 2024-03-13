import { sortVersionStringArray } from '@modules/admin/utils/sortVersionStringArray';
import { nodeClient } from '@modules/grpc';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterVersion = ({ values, onChange }: Props) => {
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
