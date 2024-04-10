import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { OrgSort, OrgSortField } from '@modules/grpc/library/blockjoy/v1/org';

export type Filter = {
  role: {
    dataField: string;
    value: string | number;
  };
};

export type InitialQueryParams = {
  pagination: Pagination;
  sort: OrgSort[];
  filter: Filter;
};

export const initialSort: OrgSort[] = [
  {
    field: OrgSortField.ORG_SORT_FIELD_NAME,
    order: SortOrder.SORT_ORDER_ASCENDING,
  },
];

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
  },

  sort: initialSort,

  filter: {
    role: {
      dataField: 'currentUser.role',
      value: '',
    },
  },
};

export const FILTERS: FilteringItem[] = [
  {
    id: 'role',
    title: 'Role',
    dataField: 'currentUser.role',
    entries: [],
  },
];
