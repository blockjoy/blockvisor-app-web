type AdminFilterControlProps = {
  isOpen?: boolean;
  columnName: string;
  items?: AdminFilterDropdownItem[];
  values?: string[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
};
