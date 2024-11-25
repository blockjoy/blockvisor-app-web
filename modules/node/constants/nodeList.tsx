import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeStatus, SortingItem } from '@shared/components';
import {
  NodeItems,
  NodeGroups,
} from '@shared/components/App/NodeItems/NodeItems';
import { NodeListGroupLayoutItem, NodeListItem } from '../types/common';

export const NODE_LIST_ITEMS: NodeListItem[] = [
  {
    key: 'customNodeInfo',
    label: 'Node Info',
    minWidth: '200px',
    width: '300px',
    dataField: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
    isVisible: true,
    alwaysVisible: true,
    component: (node: Node) => (
      <NodeGroups.Info
        displayName={node.displayName}
        blockchainName={node.blockchainName}
        createdAt={node.createdAt}
      />
    ),
    actions: ['sort_asc', 'sort_desc'],
  },
  {
    key: 'displayName',
    label: 'Display Name',
    minWidth: '140px',
    width: '300px',
    dataField: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.DisplayName displayName={node.displayName} />
    ),
    actions: ['sort_asc', 'sort_desc', 'hide'],
  },
  {
    key: 'blockchainName',
    label: 'Blockchain',
    minWidth: '110px',
    width: '180px',
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.BlockchainName
        blockchainName={node.blockchainName}
        showName={true}
      />
    ),
    actions: ['hide'],
  },
  {
    key: 'createdAt',
    label: 'Launched On',
    minWidth: '135px',
    width: '180px',
    dataField: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.CreatedAt createdAt={node.createdAt} />
    ),
    actions: ['sort_asc', 'sort_desc', 'hide'],
  },
  {
    key: 'nodeType',
    label: 'Node Type',
    minWidth: '110px',
    width: '160px',
    dataField: NodeSortField.NODE_SORT_FIELD_NODE_TYPE,
    isVisible: true,
    component: (node: Node) => <NodeItems.NodeType nodeType={node.nodeType} />,
    actions: ['sort_asc', 'sort_desc', 'hide'],
  },
  {
    key: 'status',
    label: 'Status',
    width: '400px',
    dataField: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    isVisible: true,
    component: (node: Node) => (
      <NodeStatus
        status={node.nodeStatus?.state!}
        downloadingCurrent={progress?.current}
        downloadingTotal={progress?.total}
      />
    ),
    actions: ['sort_asc', 'sort_desc', 'hide'],
  },
  {
    key: 'network',
    label: 'Network',
    width: '160px',
    isVisible: true,
    component: (node: Node) => <NodeItems.Network network={node.network} />,
    actions: ['hide'],
  },
  {
    key: 'version',
    label: 'Version',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Version version={node.version} />,
    actions: ['hide'],
  },
  {
    key: 'ip',
    label: 'Ip',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Ip ip={node.ip} />,
    actions: ['hide'],
  },
  {
    key: 'ipGateway',
    label: 'Ip Getaway',
    width: '160px',
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.IpGetaway ipGateway={node.ipGateway} />
    ),
    actions: ['hide'],
  },
  {
    key: 'placement',
    label: 'Region',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Region placement={node.placement} />,
    actions: ['hide'],
  },
  {
    key: 'createdBy',
    label: 'Launched By',
    minWidth: '110px',
    width: '160px',
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.CreatedBy createdBy={node.createdBy} />
    ),
    actions: ['hide'],
  },
];

export const NODE_LIST_LAYOUT_GROUPED_FIELDS: NodeListGroupLayoutItem[] = [
  {
    key: 'customNodeInfo',
    name: 'group-node-info',
    label: 'Group Node Info',
    dependencies: ['displayName', 'blockchainName', 'createdAt'],
    isGrouped: true,
  },
];

export const NODE_LIST_SORTING: SortingItem<NodeSortField>[] = [
  {
    id: 'name-asc',
    name: 'Name: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'name-desc',
    name: 'Name: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_NAME,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-desc',
    name: 'Newest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
  {
    id: 'date-asc',
    name: 'Oldest first',
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-asc',
    name: 'Status: A-Z',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'status-desc',
    name: 'Status: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_NODE_STATUS,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];
