import { AdminList } from '../AdminList/AdminList';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { blockchainClient } from '@modules/grpc';
import {
  Blockchain,
  BlockchainSortField,
  BlockchainVisibility,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { DateTime } from '@shared/components';

const columns: AdminListColumn[] = [
  { name: 'name', isVisible: true },
  { name: 'ticker', isVisible: true },
  { name: 'nodes', isVisible: true },
  { name: 'nodeTypes', isVisible: true },
  { name: 'visibility', isVisible: true },
  { name: 'createdAt', isVisible: true },
];

export const AdminBlockchains = () => {
  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
  ) => {
    const response = await blockchainClient.listBlockchains();
    return {
      list: response.blockchains,
      total: response.blockchainCount,
    };
  };

  const listMap = (list: Blockchain[]) =>
    list.map((blockchain) => {
      return {
        ...blockchain,
        nodes: blockchain.stats?.nodeCount,
        nodeTypes: blockchain.nodeTypes.length,
        createdAt: <DateTime date={blockchain.createdAt!} />,
        visibility: BlockchainVisibility[blockchain.visibility]
          ?.toString()
          .replace('BLOCKCHAIN_VISIBILITY_', ''),
      };
    });

  return (
    <AdminList
      name="blockchains"
      defaultSortField={BlockchainSortField.BLOCKCHAIN_SORT_FIELD_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
    />
  );
};
