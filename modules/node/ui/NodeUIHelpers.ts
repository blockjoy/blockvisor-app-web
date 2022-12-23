export type Pagination = {
  current_page: number;
  items_per_page: number;
}

export type InitialFilter = {
  blockchain: string[];
  node_status: string[];
  node_type: string[];
}

export type InitialQueryParams = {
  pagination: Pagination;
  filter: InitialFilter;
}

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    current_page: 1,
    items_per_page: 36,
  },

  filter: {
    blockchain: [],
    node_status: [],
    node_type: [],
  }
};
