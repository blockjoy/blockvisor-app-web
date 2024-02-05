import { blockchainClient } from '@modules/grpc';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterControl/AdminListFilterControl';

type Props = {
  values: string[];
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterBlockchain = ({ values, onChange }: Props) => {
  const [blockchains, setBlockchains] = useState<Blockchain[] | undefined>();

  const getBlockchains = async () => {
    const blockchains = await blockchainClient.getBlockchains();
    setBlockchains(blockchains);
  };

  useEffect(() => {
    (async () => {
      await getBlockchains();
    })();
  }, []);

  return (
    <AdminListFilterControl
      items={
        blockchains?.map((blockchain) => ({
          id: blockchain.id,
          name: blockchain.name,
        }))!
      }
      values={values}
      onChange={onChange}
    />
  );
};
