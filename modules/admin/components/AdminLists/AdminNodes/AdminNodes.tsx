import { AdminList } from '../AdminList/AdminList';
import { nodeClient } from '@modules/grpc';
import { DateTime, NodeStatus } from '@shared/components';
import {
  AdminNodesFilterBlockchain,
  AdminListFilterControl,
  AdminNodesFilterOrg,
  AdminNodesFilterUser,
  AdminNodesFilterHost,
  AdminNodesFilterRegion,
  AdminNodesFilterIp,
  AdminNodesFilterNetwork,
  AdminNodesFilterVersion,
} from '@modules/admin/components';
import {
  ContainerStatus,
  NodeStatus as NodeStatusEnum,
  NodeType,
  SyncStatus,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { pageSize } from '@modules/admin/constants/constants';
import { Node, NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import {
  capitalized,
  createAdminFilterList,
  createDropdownValuesFromEnum,
} from '@modules/admin';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';

const columns: AdminListColumn[] = [
  {
    name: 'displayName',
    width: '350px',
    sortField: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
    isVisible: true,
  },
  // {
  //   name: 'nodeName',
  //   width: '350px',
  //   sortField: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
  //   isVisible: false,
  // },
  {
    name: 'dnsName',
    width: '350px',
    sortField: NodeSortField.NODE_SORT_FIELD_DNS_NAME,
    isVisible: false,
  },
  {
    name: 'ip',
    width: '180px',
    isVisible: false,
    filterComponent: AdminNodesFilterIp,
  },
  {
    name: 'ipGateway',
    width: '140px',
    isVisible: false,
  },
  {
    name: 'status',
    displayName: 'Node Status',
    width: '240px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    isVisible: true,
    filterComponent: AdminListFilterControl,
    filterSettings: {
      items: createDropdownValuesFromEnum(NodeStatusEnum, 'NODE_STATUS_'),
    },
  },
  {
    name: 'containerStatus',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_CONTAINER_STATUS,
    isVisible: false,
    filterComponent: AdminListFilterControl,
    filterSettings: {
      items: createDropdownValuesFromEnum(ContainerStatus, 'CONTAINER_STATUS_'),
    },
  },
  {
    name: 'syncStatus',
    width: '200px',
    sortField: NodeSortField.NODE_SORT_FIELD_SYNC_STATUS,
    isVisible: false,
    filterComponent: AdminListFilterControl,
    filterSettings: {
      items: createDropdownValuesFromEnum(SyncStatus, 'SYNC_STATUS_'),
    },
  },
  {
    name: 'host',
    width: '270px',
    sortField: NodeSortField.NODE_SORT_FIELD_HOST_NAME,
    isVisible: true,
    filterComponent: AdminNodesFilterHost,
  },
  {
    name: 'nodeType',
    width: '150px',
    sortField: NodeSortField.NODE_SORT_FIELD_NODE_TYPE,
    isVisible: false,
    filterComponent: AdminListFilterControl,
    filterSettings: {
      items: createDropdownValuesFromEnum(NodeType, 'NODE_TYPE_'),
    },
  },

  {
    name: 'blockchainName',
    displayName: 'blockchain',
    width: '190px',
    isVisible: true,
    filterComponent: AdminNodesFilterBlockchain,
  },
  {
    name: 'blockHeight',
    width: '190px',
    isVisible: false,
    sortField: NodeSortField.NODE_SORT_FIELD_BLOCK_HEIGHT,
  },
  {
    name: 'network',
    width: '180px',
    isVisible: false,
    filterComponent: AdminNodesFilterNetwork,
  },
  {
    name: 'version',
    width: '210px',
    isVisible: false,
    filterComponent: AdminNodesFilterVersion,
  },
  {
    name: 'region',
    width: '210px',
    isVisible: false,
    filterComponent: AdminNodesFilterRegion,
  },
  {
    name: 'address',
    width: '350px',
    displayName: 'Node Address',
    isVisible: false,
  },
  {
    name: 'orgName',
    displayName: 'Organization',
    width: '240px',
    isVisible: true,
    filterComponent: AdminNodesFilterOrg,
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
    isVisible: true,
    filterComponent: AdminNodesFilterUser,
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
        blockchain: createAdminFilterList(filters!, 'blockchainName'),
        nodeStatus: createAdminFilterList(filters!, 'status'),
        containerStatus: createAdminFilterList(filters!, 'containerStatus'),
        syncStatus: createAdminFilterList(filters!, 'syncStatus'),
        nodeType: createAdminFilterList(filters!, 'nodeType'),
        orgIds: createAdminFilterList(filters!, 'orgName'),
        userIds: createAdminFilterList(filters!, 'createdBy'),
        hostIds: createAdminFilterList(filters!, 'host'),
        regions: createAdminFilterList(filters!, 'region'),
        ips: createAdminFilterList(filters!, 'ip'),
        networks: createAdminFilterList(filters!, 'network'),
        versions: createAdminFilterList(filters!, 'version'),
      },
      { currentPage: page!, itemsPerPage: pageSize },
      [{ field: sortField!, order: sortOrder! }],
    );
    return { list: response.nodes, total: response.nodeCount };
  };

  const listMap = (list: Node[]) =>
    list.map((node) => {
      return {
        ...node,
        status: <NodeStatus status={node.status} hasBorder={false} />,
        containerStatus: (
          <NodeStatus
            status={node.containerStatus}
            type="container"
            hasBorder={false}
          />
        ),
        syncStatus: (
          <NodeStatus status={node.syncStatus} type="sync" hasBorder={false} />
        ),
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
