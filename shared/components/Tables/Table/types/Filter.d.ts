type FilteringItem = {
  id: string;
  title: string;
  dataField: string;
  entries: any[];
};

type Pagination = {
  currentPage: number;
  itemsPerPage: number;
};
