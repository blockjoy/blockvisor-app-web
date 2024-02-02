import { blockchainClient } from '@modules/grpc';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { useEffect, useState } from 'react';
import { AdminListFilterControl } from '../AdminListFilterDropdown/AdminListFilterControl';

type Props = {
  filterSettings: AdminListColumnFilterSettings;
  onChange: (item: AdminFilterDropdownItem) => void;
};

export const AdminListFilterBlockchain = ({
  filterSettings,
  onChange,
}: Props) => {
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
      filterSettings={filterSettings}
      onChange={onChange}
    />
  );
};
