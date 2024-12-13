import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSortField } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeStatus, SortingItem } from '@shared/components';
import { NodeItems, NodeGroups } from '@shared/components';
import { NodeTags } from '@modules/node';
import { NodeListLayoutGroupItem, NodeListItem } from '../types/common';

const SORT_ACTIONS: TableHeaderAction[] = ['sort_asc', 'sort_desc'];
const LAYOUT_ACTIONS: TableHeaderAction[] = [
  'move_to_start',
  'move_to_left',
  'move_to_right',
  'move_to_end',
  'hide',
];
const ALL_ACTIONS: TableHeaderAction[] = [...SORT_ACTIONS, ...LAYOUT_ACTIONS];

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
    actions: ALL_ACTIONS,
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
    actions: LAYOUT_ACTIONS,
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
    actions: ALL_ACTIONS,
  },
  {
    key: 'tags',
    label: 'Tags',
    minWidth: '140px',
    width: '300px',
    isVisible: true,
    component: (node: Node) => <NodeTags node={node} type="list" />,
    actions: LAYOUT_ACTIONS,
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
    actions: ALL_ACTIONS,
  },
  {
    key: 'nodeType',
    label: 'Node Type',
    minWidth: '115px',
    width: '160px',
    dataField: NodeSortField.NODE_SORT_FIELD_NODE_TYPE,
    isVisible: true,
    component: (node: Node) => <NodeItems.NodeType nodeType={node.nodeType} />,
    actions: ALL_ACTIONS,
  },
  {
    key: 'network',
    label: 'Network',
    width: '160px',
    isVisible: true,
    component: (node: Node) => <NodeItems.Network network={node.network} />,
    actions: LAYOUT_ACTIONS,
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
        status={node.status}
        jobs={node.jobs}
        hasBorder={false}
        view="simple"
      />
    ),
    actions: ALL_ACTIONS,
  },
  {
    key: 'syncStatus',
    label: 'Sync Status',
    minWidth: '130px',
    width: '200px',
    dataField: NodeSortField.NODE_SORT_FIELD_SYNC_STATUS,
    isVisible: false,
    component: (node: Node) => (
      <NodeStatus
        status={node.syncStatus}
        hasBorder={false}
        type="sync"
        view="simple"
      />
    ),
    actions: ALL_ACTIONS,
  },
  {
    key: 'containerStatus',
    label: 'Container Status',
    minWidth: '170px',
    width: '200px',
    dataField: NodeSortField.NODE_SORT_FIELD_CONTAINER_STATUS,
    isVisible: false,
    component: (node: Node) => (
      <NodeStatus
        status={node.containerStatus}
        hasBorder={false}
        type="container"
        view="simple"
      />
    ),
    actions: ALL_ACTIONS,
  },
  {
    key: 'version',
    label: 'Version',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Version version={node.version} />,
    actions: LAYOUT_ACTIONS,
  },
  {
    key: 'ip',
    label: 'Ip',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Ip ip={node.ip} />,
    actions: LAYOUT_ACTIONS,
  },
  {
    key: 'ipGateway',
    label: 'Ip Gateway',
    width: '160px',
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.IpGetaway ipGateway={node.ipGateway} />
    ),
    actions: LAYOUT_ACTIONS,
  },
  {
    key: 'blockHeight',
    label: 'Block Height',
    minWidth: '140px',
    width: '250px',
    dataField: NodeSortField.NODE_SORT_FIELD_BLOCK_HEIGHT,
    isVisible: false,
    component: (node: Node) => (
      <NodeItems.BlockHeight blockHeight={node.blockHeight} />
    ),
    actions: ALL_ACTIONS,
  },
  {
    key: 'placement',
    label: 'Region',
    width: '160px',
    isVisible: false,
    component: (node: Node) => <NodeItems.Region placement={node.placement} />,
    actions: LAYOUT_ACTIONS,
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
    actions: LAYOUT_ACTIONS,
  },
];

export const NODE_LIST_LAYOUT_GROUPED_FIELDS: NodeListLayoutGroupItem[] = [
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
    field: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
  {
    id: 'name-desc',
    name: 'Name: Z-A',
    field: NodeSortField.NODE_SORT_FIELD_DISPLAY_NAME,
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
