import { capitalized } from '@modules/admin';
import {
  AdminListFilter,
  AdminListTableSortButton,
} from '@modules/admin/components';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useRef } from 'react';
import { styles } from './AdminListTableHeader.styles';

type Props = {
  column: AdminListColumn;
  filters: AdminListColumn[];
  activeSortField: number;
  activeSortOrder: SortOrder;
  scrollPosition: number;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFiltersChanged: (filters: AdminListColumn[]) => void;
};

export const AdminListTableHeader = ({
  column,
  filters,
  activeSortField,
  activeSortOrder,
  scrollPosition,
  onSortChanged,
  onFiltersChanged,
}: Props) => {
  const headerRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={headerRef} css={styles.tableHeader}>
      {column.sortField ? (
        <AdminListTableSortButton
          sortField={column.sortField}
          sortOrder={column.sortOrder}
          activeSortField={activeSortField}
          activeSortOrder={activeSortOrder}
          onClick={() => onSortChanged(column.sortField!, column.sortOrder!)}
        >
          {capitalized(column.displayName || column.name)}
        </AdminListTableSortButton>
      ) : (
        capitalized(column.displayName || column.name)
      )}
      {Boolean(column.filterSettings) && (
        <AdminListFilter
          headerRef={headerRef}
          filters={filters}
          filterSettings={column.filterSettings!}
          onChange={onFiltersChanged}
          tableScrollPosition={+scrollPosition!}
        />
      )}
    </span>
  );
};
