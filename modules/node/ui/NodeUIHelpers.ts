import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { NODE_FILTERS_DEFAULT } from '@shared/constants/lookups';
import { itemsPerPage } from '@shared/index';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    ...NODE_FILTERS_DEFAULT,
    keyword: '',
  },
};
