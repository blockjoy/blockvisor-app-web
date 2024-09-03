import { capitalized } from '@modules/admin/utils';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useRef } from 'react';
import { styles } from './AdminListTableHeader.styles';
import { AdminListTableSortButton } from './AdminListTableSortButton/AdminListTableSortButton';
import { AdminListFilter } from './AdminListFilter/AdminListFilter';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  column: AdminListColumn;
  activeSortField: number;
  activeSortOrder: SortOrder;
  scrollPosition: number;
  listAll: any[];
  blockchains?: Blockchain[];
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFilterChange: (item: AdminFilterDropdownItem, columnName: string) => void;
  onReset: (columName: string) => void;
};

export const AdminListTableHeader = ({
  column,
  activeSortField,
  activeSortOrder,
  scrollPosition,
  listAll,
  blockchains,
  onSortChanged,
  onFilterChange,
  onReset,
}: Props) => {
  const headerRef = useRef<HTMLSpanElement>(null);

  const handleFilterChange = (item: AdminFilterDropdownItem) =>
    onFilterChange(item, column.name);

  return (
    <span ref={headerRef} css={styles.tableHeader}>
      <>
        {Boolean(column.sortField) ? (
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
        {Boolean(column.filterComponent) && (
          <AdminListFilter
            listAll={listAll}
            column={column}
            headerRef={headerRef}
            blockchains={blockchains}
            onFilterChange={handleFilterChange}
            onReset={onReset}
            tableScrollPosition={+scrollPosition!}
          />
        )}
      </>
    </span>
  );
};
