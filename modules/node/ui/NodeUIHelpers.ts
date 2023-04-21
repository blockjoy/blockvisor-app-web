import { Node_NodeStatus, Node_NodeType } from '@modules/grpc/library/node';

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
  nodeStatus?: Node_NodeStatus[];
  nodeType?: Node_NodeType[];
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: InitialFilter;
};

export const itemsPerPage = {
  sm: 18,
  lg: 36,
  xxl: 48,
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    current_page: 1,
    items_per_page: itemsPerPage['lg'],
  },

  filter: {
    blockchain: [],
    nodeStatus: [],
    nodeType: [],
  },
};
