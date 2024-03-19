import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import { HOST_FILTERS_DEFAULT } from '@shared/constants/lookups';
import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UIHostFilterCriteria;
};

export const initialFilter: UIHostFilterCriteria = {
  hostStatus: [],
  hostMemory: HOST_FILTERS_DEFAULT.hostMemory,
  hostCPU: HOST_FILTERS_DEFAULT.hostCPU,
  hostSpace: HOST_FILTERS_DEFAULT.hostSpace,
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    ...initialFilter,
  },
};
