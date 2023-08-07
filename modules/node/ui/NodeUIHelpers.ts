import { NodeStatus, NodeType } from '@modules/grpc/library/blockjoy/v1/node';

export type ItemsPerPage = {
  sm: number;
  lg: number;
  xxl: number;
};

export type Pagination = {
  current_page: number;
  items_per_page: number;
};

export type InitialFilter = {
  blockchain?: string[];
  nodeStatus?: string[];
  nodeType?: string[];
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: InitialFilter;
};

export const itemsPerPage = {
  sm: 18,
  lg: 36,
  xl: 48,
  xxl: 100,
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    current_page: 1,
    items_per_page: itemsPerPage['xxl'],
  },

  filter: {
    blockchain: [],
    nodeStatus: [],
    nodeType: [],
  },
};
