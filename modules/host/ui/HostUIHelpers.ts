import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type InitialFilter = {
  hostStatus?: string[];
  hostMemory: number[];
  hostCPU: number[];
  hostSpace: number[];
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
    hostStatus: [],
    hostMemory: [],
    hostCPU: [],
    hostSpace: [],
  },
};
