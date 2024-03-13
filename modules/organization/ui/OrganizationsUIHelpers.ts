export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type Sorting = {
  order: 'asc' | 'desc';
  field: string;
};

export type Filtering = {
  role: {
    dataField: string;
    value: string | number;
  };
};

export type InitialQueryParams = {
  pagination: Pagination;
  sorting: Sorting;
  filtering: Filtering;
};

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
  },
  sorting: { order: 'asc', field: 'name' },
  filtering: {
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
