import { AdminList } from '../AdminList/AdminList';
import { nodeClient } from '@modules/grpc';
import { DateTime, NodeStatus } from '@shared/components';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/common/v1/node';
import { pageSize } from '@modules/admin/constants/constants';
import { Node, NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { capitalized } from '@modules/admin/utils/capitalized';
import { createDropdownValuesFromEnum } from '@modules/admin/utils';

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
    filterSettings: {
      type: 'default',
      name: 'nodeStatus',
      values: [],
      dropdownItems: createDropdownValuesFromEnum(
        NodeStatusEnum,
        'NODE_STATUS_',
      ),
    },
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
    filterSettings: {
      type: 'blockchain',
      values: [],
    },
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
    filters?: AdminListColumn[],
  ) => {
    const response = await nodeClient.listNodes(
      undefined,
      {
        keyword,
        blockchain: filters?.find(
          (filter) => filter.filterSettings?.type === 'blockchain',
        )?.filterSettings?.values,
        nodeStatus: filters?.find(
          (filter) => filter.filterSettings?.name === 'nodeStatus',
        )?.filterSettings?.values,
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
        createdAt: <DateTime date={node.createdAt!} />,
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
