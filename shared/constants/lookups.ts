import { UIHostFilterCriteria, UINodeFilterCriteria } from '@modules/grpc';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import {
  HostSort,
  HostSortField,
} from '@modules/grpc/library/blockjoy/v1/host';
import {
  NodeSort,
  NodeSortField,
} from '@modules/grpc/library/blockjoy/v1/node';
import { itemsPerPage } from '@shared/utils/infiniteScroll';

export const nodeTypeList = [
  { id: 4, name: 'API' },
  { id: 8, name: 'Beacon' },
  { id: 2, name: 'ETL' },
  { id: 7, name: 'Execution' },
  { id: 11, name: 'Full Node' },
  { id: 12, name: 'Light Node' },
  { id: 9, name: 'MEV Boost' },
  { id: 1, name: 'Miner' },
  { id: 10, name: 'Node' },
  { id: 5, name: 'Oracle' },
  { id: 6, name: 'Relay' },
  { id: 3, name: 'Validator' },
];

// TODO: merge with nodeTypeList
export const nodeTypes = {
  10: 'A',
};

export const nodeNetworkTypes = [
  { id: 1, value: 'DN' },
  { id: 2, value: 'TN' },
  { id: 3, value: 'MN' },
];

export const nodeTypeConfigLabels = [
  { name: 'keystore-file', value: 'Validator Key Upload' },
  { name: 'keystore-file-1', value: 'Key Upload 1' },
  { name: 'keystore-file-2', value: 'Key Upload 2' },
  { name: 'keystore-file-3', value: 'Key Upload 3' },
  { name: 'voting-pwd', value: 'Voting Password' },
  { name: 'fee-recipient', value: 'Fee Recipient' },
  { name: 'mev-boost', value: 'MEV Boost' },
  { name: 'self-hosted', value: 'Self Hosted' },
];

export const nodeTypeProps = {
  number: 'number',
  text: 'string',
  boolean: 'boolean',
  fileUpload: 'file-upload',
  hostSelector: 'host-selector',
  nodeSelector: 'node-selector',
};

export const NODE_FILTERS_DEFAULT: UINodeFilterCriteria = {
  blockchain: [],
  nodeStatus: [],
  nodeType: [],
  networks: [],
  versions: [],
  keyword: '',
};

export const NODE_SORT_DEFAULT: NodeSort[] = [
  {
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];

export const NODE_PAGINATION_DEFAULT: Pagination = {
  currentPage: 0,
  itemsPerPage: itemsPerPage['xl'],
};

export const HOST_FILTERS_DEFAULT: UIHostFilterCriteria = {
  hostStatus: [],
  hostMemory: [2 * Math.pow(1024, 3), 512 * Math.pow(1024, 3)],
  hostCPU: [1, 64],
  hostSpace: [250 * Math.pow(1024, 3), 10 * Math.pow(1024, 4)],
  keyword: '',
};

export const HOST_SORT_DEFAULT: HostSort[] = [
  {
    field: HostSortField.HOST_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];

export const HOST_PAGINATION_DEFAULT: Pagination = {
  currentPage: 0,
  itemsPerPage: itemsPerPage['xl'],
};

export const HOST_FILTERS_STEPS = {
  hostMemory: 2 * Math.pow(1024, 3),
  hostCPU: 1,
  hostSpace: 250 * Math.pow(1024, 3),
};

export const HOST_FILTERS_CUSTOM_VALUES = {
  hostSpace: [
    250 * Math.pow(1024, 3),
    500 * Math.pow(1024, 3),
    750 * Math.pow(1024, 3),
    1 * Math.pow(1024, 4),
    2 * Math.pow(1024, 4),
    3 * Math.pow(1024, 4),
    4 * Math.pow(1024, 4),
    5 * Math.pow(1024, 4),
    6 * Math.pow(1024, 4),
    7 * Math.pow(1024, 4),
    8 * Math.pow(1024, 4),
    9 * Math.pow(1024, 4),
    10 * Math.pow(1024, 4),
  ],
};

export const STATE_TYPE = {
  AE: 'emirate',
  AR: 'province',
  AU: 'state',
  BB: 'parish',
  BR: 'state',
  CA: 'province',
  CN: 'province',
  ES: 'province',
  HK: 'area',
  JP: 'prefecture',
  KR: 'do_si',
  MX: 'state',
  SV: 'province',
  US: 'state',
  VN: 'province',
};
