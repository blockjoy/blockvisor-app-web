import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import {
  HostSort,
  HostSortField,
} from '@modules/grpc/library/blockjoy/v1/host';
import { HOST_FILTERS_DEFAULT } from '@shared/constants/lookups';
import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UIHostFilterCriteria;
  sort: HostSort[];
};

export const initialFilter: UIHostFilterCriteria = {
  hostStatus: [],
  hostMemory: HOST_FILTERS_DEFAULT.hostMemory,
  hostCPU: HOST_FILTERS_DEFAULT.hostCPU,
  hostSpace: HOST_FILTERS_DEFAULT.hostSpace,
};

export const initialSort: HostSort[] = [
  {
    field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
];
export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: initialFilter,

  sort: initialSort,
};
