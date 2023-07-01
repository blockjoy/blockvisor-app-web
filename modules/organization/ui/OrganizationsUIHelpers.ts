import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';

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

const currentlyAvailableRoles = Object.fromEntries(
  Object.entries(USER_ROLES).filter(([_, value]) =>
    [USER_ROLES[1], USER_ROLES[2]].includes(value),
  ),
);

const AVAILABLE_ROLES = Object.entries(currentlyAvailableRoles).map(
  ([key, value]) => ({ value: key, label: value }),
);

export const FILTERS: FilteringItem[] = [
  {
    id: 'role',
    title: 'Role',
    dataField: 'currentUser.role',
    entries: AVAILABLE_ROLES,
  },
];
