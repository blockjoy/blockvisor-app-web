export type ItemsPerPage = {
  sm: number;
  lg: number;
  xxl: number;
};

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

export const itemsPerPage = {
  sm: 18,
  lg: 36,
  xl: 48,
  xxl: 100,
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
