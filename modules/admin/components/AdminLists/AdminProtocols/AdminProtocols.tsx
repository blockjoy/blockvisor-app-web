import { AdminList } from '../AdminList/AdminList';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { protocolClient, ProtocolFilter } from '@modules/grpc';
import { pageSize } from '@modules/admin/constants/constants';
import {
  Protocol,
  ProtocolSortField,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { DateTime } from '@shared/components';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';

const columns: AdminListColumn[] = [
  {
    name: 'name',
    isVisible: true,
    width: '200px',
    sortField: ProtocolSortField.PROTOCOL_SORT_FIELD_NAME,
  },
  {
    name: 'key',
    isVisible: true,
    width: '200px',
    sortField: ProtocolSortField.PROTOCOL_SORT_FIELD_KEY,
  },
  { name: 'visibility', isVisible: true, width: '160px' },
  { name: 'ticker', isVisible: true, width: '160px' },
  { name: 'orgId', isVisible: true, width: '160px' },
  { name: 'createdAt', isVisible: true, width: '160px' },
];

export const AdminProtocols = () => {
  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
  ) => {
    const Filter: ProtocolFilter = {
      keyword,
    };

    const response = await protocolClient.listProtocols(
      undefined,
      { keyword },
      { currentPage: page!, itemsPerPage: pageSize },
      [{ field: sortField!, order: sortOrder! }],
    );
    return {
      list: response.protocols,
      total: response.total,
    };
  };

  const listMap = (list: Protocol[]) =>
    list.map((protocol) => {
      return {
        ...protocol,
        createdAt: <DateTime date={protocol.createdAt!} />,
        visibility: Visibility[protocol.visibility]
          ?.toString()
          .replace('VISIBILITY_', ''),
      };
    });

  return (
    <AdminList
      name="protocols"
      idPropertyName="protocolId"
      defaultSortField={ProtocolSortField.PROTOCOL_SORT_FIELD_NAME}
      defaultSortOrder={SortOrder.SORT_ORDER_ASCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
    />
  );
};
