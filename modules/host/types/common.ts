import { UIHostFilterCriteria } from '@modules/grpc';
import { HostSort } from '@modules/grpc/library/blockjoy/v1/host';

export type InitialHostQueryParams = {
  pagination: Pagination;
  filter: UIHostFilterCriteria;
  sort: HostSort[];
};
