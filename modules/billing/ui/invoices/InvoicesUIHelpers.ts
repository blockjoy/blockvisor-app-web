import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type Sorting = {
  order: 'asc' | 'desc';
  field: string;
};

export type Filtering = {
  offset?: string | undefined;
};

export type InvoicesQueryParams = {
  pagination: Pagination;
  sorting: Sorting;
  filtering: Filtering;
};

export const initialQueryParams: InvoicesQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: itemsPerPage['xl'],
  },
  sorting: { order: 'desc', field: 'date' },
  filtering: {
    offset: undefined,
  },
};
