import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import {
  NODE_FILTERS_DEFAULT,
  NODE_PAGINATION_DEFAULT,
  NODE_SORT_DEFAULT,
} from '@shared/constants/lookups';

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
  sort: NodeSort[];
};

export const initialQueryParams: InitialQueryParams = {
  pagination: NODE_PAGINATION_DEFAULT,
  filter: NODE_FILTERS_DEFAULT,
  sort: NODE_SORT_DEFAULT,
};
