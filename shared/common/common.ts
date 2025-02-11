import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

export type BasicSortOrder = 'asc' | 'desc';

export type Sort<OrderField = any, OrderType = SortOrder> = {
  field?: OrderField;
  order?: OrderType;
};

export type BaseQueryParams = {
  pagination: Pagination;
  filter?: any;
  sort: Sort[];
};
