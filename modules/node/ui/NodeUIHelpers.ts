import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import {
  NodeSort,
  NodeSortField,
} from '@modules/grpc/library/blockjoy/v1/node';
import { itemsPerPage } from '@shared/index';

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
  sort: NodeSort[];
};

export const initialFilter: UINodeFilterCriteria = {
  blockchain: [],
  nodeType: [],
  nodeStatus: [],
};

export const initialSort: NodeSort[] = [
  {
    field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
    order: SortOrder.SORT_ORDER_DESCENDING,
  },
];

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    ...initialFilter,
    keyword: '',
  },

  sort: initialSort,
};
