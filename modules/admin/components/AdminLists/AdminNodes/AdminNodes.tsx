import { AdminList } from '../AdminList/AdminList';
import { nodeClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { NodeStatus } from '@shared/components';
import { pageSize } from '@modules/admin/constants/constants';
import { Node, NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { capitalized } from '@modules/admin/utils/capitalized';

const columns: AdminListColumn[] = [
  {
    name: 'name',
    width: '350px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    isVisible: true,
  },
  {
    name: 'ip',
    width: '140px',
    isVisible: false,
  },
  {
    name: 'ipGateway',
    width: '140px',
    isVisible: false,
  },
  {
    name: 'status',
    width: '230px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    isVisible: true,
  },
  {
    name: 'host',
    width: '330px',
    sortField: NodeSortField.NODE_SORT_FIELD_HOST_NAME,
    isVisible: true,
  },
  {
    name: 'nodeType',
    width: '150px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_TYPE,
    isVisible: true,
  },
  {
    name: 'blockchainName',
    width: '190px',
    isVisible: true,
  },
  {
    name: 'blockHeight',
    width: '190px',
    isVisible: true,
  },
  {
    name: 'network',
    width: '100px',
    isVisible: false,
  },
  {
    name: 'version',
    width: '130px',
    isVisible: false,
  },
  {
    name: 'region',
    width: '210px',
    isVisible: false,
  },
  {
    name: 'orgName',
    width: '240px',
    isVisible: true,
  },
  {
    name: 'createdAt',
    displayName: 'Launched On',
    width: '230px',
    sortField: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    isVisible: true,
  },
  {
    name: 'createdBy',
    displayName: 'Launched By',
    width: '230px',
    isVisible: false,
  },
];

export const AdminNodes = () => {
  const getList = async (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: SortOrder,
  ) => {
    const response = await nodeClient.listNodes(
      undefined,
      {
        keyword,
      },
      {
        current_page: page!,
        items_per_page: pageSize,
      },
      [
        {
          field: sortField!,
          order: sortOrder!,
        },
      ],
    );
    return {
      list: response.nodes,
      total: response.nodeCount,
    };
  };

  const listMap = (list: Node[]) =>
    list.map((node) => {
      return {
        ...node,
        status: <NodeStatus status={node.status} hasBorder={false} />,
        nodeType: capitalized(convertNodeTypeToName(node.nodeType)),
        region: node.placement?.scheduler?.region,
        createdAt: `${formatters.formatDate(
          node.createdAt!,
        )} @ ${formatters.formatDate(node.createdAt!, 'time')}`,
        createdBy: node.createdBy?.name,
        host: node.hostName,
      };
    });

  return (
    <AdminList
      name="nodes"
      defaultSortField={NodeSortField.NODE_SORT_FIELD_CREATED_AT}
      defaultSortOrder={SortOrder.SORT_ORDER_DESCENDING}
      columns={columns}
      getList={getList}
      listMap={listMap}
    />
  );
};
