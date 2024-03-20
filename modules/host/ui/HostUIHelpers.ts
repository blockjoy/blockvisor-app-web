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

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    ...HOST_FILTERS_DEFAULT,
  },
};
