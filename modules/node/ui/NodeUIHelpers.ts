import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { itemsPerPage } from '@shared/index';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
};

export const initialFilter: UINodeFilterCriteria = {
  blockchain: [],
  nodeType: [],
  nodeStatus: [],
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    ...initialFilter,
    keyword: '',
  },
};
