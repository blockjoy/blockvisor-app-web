import { itemsPerPage } from '@shared/index';
import { hostFiltersDefaults } from '@shared/constants/lookups';

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
    current_page: 0,
    items_per_page: itemsPerPage['xl'],
  },

  filter: {
    hostStatus: [],
    hostMemory: [],
    hostCPU: [],
    hostSpace: [],
  },
};
