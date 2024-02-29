import { itemsPerPage } from '@shared/index';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type InitialFilter = {
  blockchain?: string[];
  nodeStatus?: string[];
  nodeType?: string[];
  keyword?: string;
};

export type InitialQueryParams = {
  pagination: Pagination;
  filter: InitialFilter;
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 0,
    itemsPerPage: itemsPerPage['xl'],
  },

  filter: {
    blockchain: [],
    nodeStatus: [],
    nodeType: [],
    keyword: '',
  },
};
