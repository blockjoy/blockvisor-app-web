import { capitalized } from '@modules/admin/utils';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useRef } from 'react';
import { styles } from './AdminListTableHeader.styles';
import { AdminListTableSortButton } from './AdminListTableSortButton/AdminListTableSortButton';
import { AdminListFilter } from './AdminListFilter/AdminListFilter';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  index: number;
  isLastColumn: boolean;
  column: AdminListColumn;
  activeSortField: number;
  activeSortOrder: SortOrder;
  scrollX: number;
  listAll: any[];
  blockchains?: Blockchain[];
  initResize: any;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFilterChange: (item: AdminFilterDropdownItem, columnName: string) => void;
  onReset: (columName: string) => void;
  onResizeMouseEnter: (left: number) => void;
  onResizeMouseLeave: VoidFunction;
};

export const AdminListTableHeader = ({
  index,
  isLastColumn,
  column,
  activeSortField,
  activeSortOrder,
  scrollX,
  listAll,
  blockchains,
  initResize,
  onSortChanged,
  onFilterChange,
  onReset,
  onResizeMouseEnter,
  onResizeMouseLeave,
}: Props) => {
  const headerRef = useRef<HTMLSpanElement>(null);
  const resizerRef = useRef<HTMLSpanElement>(null);

  const handleFilterChange = (item: AdminFilterDropdownItem) =>
    onFilterChange(item, column.name);

  return (
    <span ref={headerRef} css={styles.tableHeader}>
      <>
        {column.isResizable !== false && !isLastColumn && (
          <span
            ref={resizerRef}
            css={styles.resizer}
            onMouseDown={(e) => initResize(e, index)}
            onMouseEnter={() =>
              onResizeMouseEnter(
                headerRef?.current?.offsetLeft! +
                  headerRef?.current?.clientWidth! -
                  7,
              )
            }
            onMouseLeave={onResizeMouseLeave}
          ></span>
        )}
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
          <span css={styles.tableHeaderText}>
            {capitalized(column.displayName || column.name)}
          </span>
        )}
        {Boolean(column.filterComponent) && (
          <AdminListFilter
            listAll={listAll}
            column={column}
            headerRef={headerRef}
            blockchains={blockchains}
            onFilterChange={handleFilterChange}
            onReset={onReset}
            scrollX={scrollX}
          />
        )}
      </>
    </span>
  );
};
