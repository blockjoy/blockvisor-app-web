import { itemsPerPage } from '@shared/index';

export type Pagination = {
  current_page: number;
  items_per_page: number;
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
    current_page: 0,
    items_per_page: itemsPerPage['xl'],
  },

  filter: {
    blockchain: [],
    nodeStatus: [],
    nodeType: [],
    keyword: '',
  },
};
