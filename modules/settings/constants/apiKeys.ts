import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { ListApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { BaseQueryParams, Sort } from '@shared/common/common';

export const API_KEYS_DEFAULT_SORT: Sort<keyof ListApiKey> = {
  field: 'updatedAt',
  order: SortOrder.SORT_ORDER_DESCENDING,
};

export const API_KEYS_QUERY_PARAMS: BaseQueryParams = {
  sort: [API_KEYS_DEFAULT_SORT],
  pagination: {
    currentPage: 0,
    itemsPerPage: 1000,
  },
};
