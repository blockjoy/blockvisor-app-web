import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type Sorting = {
  order: 'asc' | 'desc';
  field: string;
};

export type InitialQueryParams = {
  pagination: Pagination;
  sorting: Sorting;
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: itemsPerPage['lg'],
  },
  sorting: { order: 'desc', field: 'date' },
};
