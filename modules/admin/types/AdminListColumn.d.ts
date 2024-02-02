type AdminListColumn = {
  name: string;
  width?: string;
  canCopy?: boolean;
  sortField?: number;
  sortOrder?: SortOrder;
  displayName?: string;
  isVisible?: boolean;
  filterSettings?: AdminListColumnFilterSettings;
};
