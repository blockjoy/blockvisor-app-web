import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import { HostSort } from '@modules/grpc/library/blockjoy/v1/host';
import {
  HOST_FILTERS_DEFAULT,
  HOST_PAGINATION_DEFAULT,
  HOST_SORT_DEFAULT,
} from '@shared/index';

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UIHostFilterCriteria;
  sort: HostSort[];
};

export const initialQueryParams: InitialQueryParams = {
  pagination: HOST_PAGINATION_DEFAULT,
  filter: HOST_FILTERS_DEFAULT,
  sort: HOST_SORT_DEFAULT,
};
