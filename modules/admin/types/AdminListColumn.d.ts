import { AdminFilterComponent } from './AdminFilterComponent';

type AdminListColumn = {
  name: string;
  width?: string;
  canCopy?: boolean;
  sortField?: number;
  sortOrder?: SortOrder;
  displayName?: string;
  isVisible?: boolean;
  isRowClickDisabled?: boolean;
  filterComponent?: React.FunctionComponent<AdminFilterControlProps>;
  filterSettings?: AdminListColumnFilterSettings;
};
