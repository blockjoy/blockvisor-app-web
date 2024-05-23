import { AdminList } from '../AdminList/AdminList';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { blockchainClient, BlockchainFilter } from '@modules/grpc';
import { pageSize } from '@modules/admin/constants/constants';
import {
  Blockchain,
  BlockchainSortField,
  BlockchainVisibility,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { DateTime } from '@shared/components';
import { getBlockchainDisplayName } from '@shared/utils/getBlockchainDisplayName';

const columns: AdminListColumn[] = [
  { name: 'name', isVisible: true, width: '200px' },
  { name: 'ticker', isVisible: true, width: '120px' },
  { name: 'nodes', isVisible: true, width: '80px' },
  { name: 'nodeTypes', isVisible: true, width: '120px' },
  { name: 'visibility', isVisible: true, width: '120px' },
  { name: 'createdAt', isVisible: true, width: '160px' },
];

export const AdminBlockchains = () => {
  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
  ) => {
    const Filter: BlockchainFilter = {
      keyword,
    };

    const response = await blockchainClient.listBlockchains(
      undefined,
      { keyword },
      { currentPage: page!, itemsPerPage: pageSize },
      [{ field: sortField!, order: sortOrder! }],
    );
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
        name: getBlockchainDisplayName(blockchain.name),
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
