import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Sort } from '@shared/common/common';

export type InitialQueryParams = {
  pagination: Pagination;
  sort: Sort;
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
  },
  sort: { order: SortOrder.SORT_ORDER_ASCENDING, field: 'email' },
};
