export type Pagination = {
  current_page: number;
  items_per_page: number;
}

export type InitialQueryParams = {
  pagination: Pagination;
}

export const initialQueryParams: InitialQueryParams = {
  pagination: {
    current_page: 1,
    items_per_page: 10,
  }
};
