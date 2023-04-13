type FilteringItem = {
  id: string;
  title: string;
  dataField: string;
  entries: any[];
};

type Pagination = {
  currentPage?: number;
  itemsPerPage?: number;
};

type Sorting = {
  order?: 'asc' | 'desc';
  field?: string;
};

type Filtering = {
  [key: string]: {
    dataField: string;
    value: string | number;
  };
};

type InitialFilter = {
  pagination?: Pagination;
  sorting?: Sorting;
  filtering?: Filtering;
};
