import { blockchainClient } from '@modules/grpc';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterBlockchain = ({ values, onChange }: Props) => {
  const [list, setList] = useState<Blockchain[] | undefined>();

  const getList = async () => {
    const response = await blockchainClient.listBlockchains();
    setList(response);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  return (
    <AdminListFilterControl
      items={
        list?.map((blockchain) => ({
          id: blockchain.id,
          name: blockchain.name,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
