import { blockchainClient } from '@modules/grpc';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '@modules/admin';

export const AdminNodesFilterBlockchain = ({
  columnName,
  values,
  onFilterChange,
}: AdminFilterControlProps) => {
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
      columnName={columnName}
      items={
        list?.map((blockchain) => ({
          id: blockchain.id,
          name: blockchain.name,
        }))!
      }
      values={values}
      onFilterChange={onFilterChange}
    />
  );
};
