import { itemsPerPage } from '@shared/utils/infiniteScroll';

export type InvoicesQueryParams = {
  pagination: Pagination;
  filter: {
    offset?: string | undefined;
  };
  sort: {
    order: string;
    field: string;
  };
};

export const initialQueryParams: InvoicesQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: itemsPerPage['xl'],
  },

  sort: { order: 'desc', field: 'date' },

  filter: {
    offset: undefined,
  },
};
