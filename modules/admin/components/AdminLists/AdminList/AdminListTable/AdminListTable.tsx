import { styles } from './AdminListTable.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { Checkbox, Copy, TableSkeleton } from '@shared/components';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { AdminListRowCount } from './AdminListRowCount/AdminListRowCount';
import {
  createRef,
  MouseEvent,
  RefObject,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AdminListTableHeader } from './AdminListTableHeader/AdminListTableHeader';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';

type Props = {
  name: string;
  idPropertyName: string;
  isLoading: boolean;
  columns: AdminListColumn[];
  hidePagination?: boolean;
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  listAll: any[];
  activeSortField: number;
  activeSortOrder: SortOrder;
  selectedIds?: string[];
  protocols?: Protocol[];
  onIdSelected?: (id: string, isSelected: boolean) => void;
  onIdAllSelected?: (ids: string[]) => void;
  onPageChanged: (page: number) => void;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFiltersChanged: (nextFilters: AdminListColumn[]) => void;
  onColumnsChanged: (nextColumns: AdminListColumn[]) => void;
};

export const AdminListTable = ({
  name,
  idPropertyName,
  columns,
  hidePagination,
  isLoading,
  list,
  listTotal,
  listPage,
  listAll,
  activeSortField,
  activeSortOrder,
  selectedIds,
  protocols,
  onIdSelected,
  onIdAllSelected,
  onPageChanged,
  onSortChanged,
  onFiltersChanged,
  onColumnsChanged,
}: Props) => {
  const router = useRouter();

  const { search, page, field, order } = router.query;

  const [scrollX, setScrollX] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isTableHeaderHovered, setIsTableHeaderHovered] = useState(false);
  const [columnRefs, setColumnRefs] = useState<
    RefObject<HTMLTableCellElement>[]
  >([]);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeLineLeft, setResizeLineLeft] = useState(0);
  const [isSelectingCheckboxes, setIsSelectingCheckboxes] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeIndex = useRef<number>(0);

  const pageCount = Math.ceil(listTotal! / pageSize);

  const gotoDetails = (id: string) => {
    const query: any = {
      name: name.toLowerCase(),
      id,
    };

    if (search) query.search = search;
    if (page) query.page = page;
    if (field) query.field = field;
    if (order) query.order = order;

    router.push({
      pathname: '',
      query,
    });
  };

  const handleBodyScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollX(e.currentTarget.scrollLeft);

    if (!isScrolledDown && e.currentTarget.scrollTop > 0) {
      setIsScrolledDown(true);
    } else if (isScrolledDown && e.currentTarget.scrollTop <= 0) {
      setIsScrolledDown(false);
    }
  };

  const handleFilterChange = (
    item: AdminFilterDropdownItem,
    columnName: string,
  ) => {
    const column = columns.find((c) => c.name === columnName);

    let valuesCopy = column?.filterSettings?.values
      ? [...column?.filterSettings.values]
      : [];

    const valueExists = valuesCopy?.some((value) => value === item.id);

    if (valueExists) {
      valuesCopy = valuesCopy.filter((v) => v !== item.id)!;
    } else {
      valuesCopy.push(item.id!);
    }

    const columnsCopy = [...columns];

    const foundFilter = columnsCopy.find(
      (column) => column.name === columnName,
    );

    if (!foundFilter || !foundFilter?.filterComponent) return;

    foundFilter.filterSettings = foundFilter.filterSettings || {};

    foundFilter.filterSettings.values = valuesCopy;

    onFiltersChanged(columnsCopy);
  };

  const handleReset = (columnName: string) => {
    const filtersCopy = [...columns];

    const foundFilter = filtersCopy.find((f) => f.name === columnName);

    if (!foundFilter || !foundFilter.filterSettings) return;

    foundFilter.filterSettings.values = [];

    onFiltersChanged(filtersCopy);
  };

  const handleResizeMouseEnter = (left: number) => {
    if (!isTableHeaderHovered) {
      setResizeLineLeft(
        wrapperRef?.current?.offsetLeft! -
          wrapperRef?.current?.scrollLeft! +
          left,
      );
      setIsTableHeaderHovered(true);
    }
  };

  const handleResizeMouseLeave = () => setIsTableHeaderHovered(false);

  const resize = (e: globalThis.MouseEvent): void => {
    setIsResizing(true);
    setResizeLineLeft(e.clientX);
  };

  const stopResize = (e: globalThis.MouseEvent): void => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);

    const columnRef = columnRefs[activeIndex.current];
    const nextWidth =
      e.clientX -
      columnRef?.current?.offsetLeft! -
      (wrapperRef?.current?.offsetLeft! - wrapperRef?.current?.scrollLeft!);

    const columnName = columnsVisible[activeIndex.current].name;
    const columnsCopy = [...columns];
    const columnCopy = columnsCopy.find((c) => c.name === columnName);

    if (!columnCopy) return;

    columnCopy.width = `${nextWidth < 100 ? 100 : nextWidth}px`;
    onColumnsChanged(columnsCopy);
  };

  const initResize = (e: globalThis.MouseEvent, index: number): void => {
    activeIndex.current = index;
    e.stopPropagation();
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  const handleCheckAllClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedIds?.length === list.length) {
      onIdAllSelected?.([]);
    } else {
      onIdAllSelected?.(list.map((item) => item[idPropertyName]));
    }
  };

  const handleCheckboxClick = (id: string, isSelected: boolean) => {
    setIsChecking(isSelected);
    setIsSelectingCheckboxes(true);
    onIdSelected?.(id, isSelected);
  };

  const columnsVisible = columns.filter((column) => column.isVisible);

  useEffect(() => {
    setColumnRefs(
      Array(columnsVisible.length)
        .fill(undefined, 0, columnsVisible.length - 1)
        .map((_, i) => columnRefs[i] || createRef()),
    );

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [columnsVisible.length]);

  if (isLoading)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  return (
    <>
      <div
        ref={wrapperRef}
        css={styles.tableWrapper(listAll?.length > pageSize)}
        onScroll={handleBodyScroll}
        onMouseLeave={() => setIsSelectingCheckboxes(false)}
      >
        <div
          css={styles.resizeLine(isResizing, isTableHeaderHovered)}
          style={{
            left: `${resizeLineLeft}px`,
            top: `${wrapperRef?.current?.offsetTop}px`,
            bottom: `${
              window.innerHeight -
              (wrapperRef?.current?.offsetTop! +
                wrapperRef?.current?.clientHeight!)
            }px`,
          }}
        ></div>
        <table css={styles.table(isScrolledDown)}>
          <thead
            onMouseEnter={() => {
              if (isSelectingCheckboxes) {
                setIsSelectingCheckboxes(false);
              }
            }}
          >
            <tr>
              {Boolean(onIdSelected) && (
                <th
                  style={{
                    width: '50px',
                    minWidth: '50px',
                    maxWidth: '50px',
                    padding: 0,
                  }}
                >
                  <button
                    disabled={!list.length}
                    type="button"
                    css={styles.checkboxButton}
                    onClick={handleCheckAllClicked}
                  >
                    <Checkbox
                      disabled={!list.length}
                      name="check-all"
                      checked={
                        selectedIds?.length! > 0 &&
                        selectedIds?.length === list.length
                      }
                    />
                  </button>
                </th>
              )}
              {columnsVisible.map((column, index) => (
                <th
                  ref={columnRefs[index]}
                  key={column.name}
                  css={styles.tableCell(
                    column.width!,
                    index === columnsVisible.length - 1,
                    true,
                    true,
                  )}
                >
                  <AdminListTableHeader
                    index={index}
                    canResize={index !== columnsVisible.length - 1}
                    isLastColumn={index === columnsVisible.length - 1}
                    initResize={initResize}
                    listAll={listAll}
                    protocols={protocols}
                    activeSortField={activeSortField}
                    activeSortOrder={activeSortOrder}
                    column={column}
                    scrollX={scrollX}
                    onFilterChange={handleFilterChange}
                    onSortChanged={onSortChanged}
                    onReset={handleReset}
                    onResizeMouseEnter={handleResizeMouseEnter}
                    onResizeMouseLeave={handleResizeMouseLeave}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item[idPropertyName]}
                className={
                  selectedIds?.includes(item[idPropertyName]) ? 'selected' : ''
                }
                onMouseEnter={() =>
                  isSelectingCheckboxes
                    ? onIdSelected?.(item[idPropertyName], isChecking)
                    : null
                }
                onMouseUp={() => setIsSelectingCheckboxes(false)}
              >
                {Boolean(onIdSelected) && (
                  <td style={{ padding: 0 }}>
                    <button
                      css={styles.checkboxButton}
                      type="button"
                      onMouseDown={() =>
                        handleCheckboxClick(
                          item[idPropertyName],
                          !selectedIds?.includes(item[idPropertyName]),
                        )
                      }
                      onMouseUp={() => setIsSelectingCheckboxes(false)}
                    >
                      <Checkbox
                        name={item[idPropertyName]}
                        checked={selectedIds?.includes(item[idPropertyName])}
                      />
                    </button>
                  </td>
                )}
                {columnsVisible.map((column, index) => (
                  <td
                    key={column.name}
                    css={styles.tableCell(
                      column.width!,
                      index === columnsVisible.length - 1,
                      column.isRowClickDisabled!,
                      column.isOverflowHidden !== false,
                    )}
                    onClick={() =>
                      column.isRowClickDisabled
                        ? null
                        : gotoDetails(item[idPropertyName])
                    }
                    onMouseUp={() => {
                      if (isSelectingCheckboxes) {
                        setIsSelectingCheckboxes(false);
                      }
                    }}
                  >
                    {column.canCopy ? (
                      <div css={styles.copyTd}>
                        {item[column.name] || '-'}
                        {column.canCopy && (
                          <span className="copy-button" css={styles.copyButton}>
                            <Copy value={item[column.name] || ''} hideTooltip />
                          </span>
                        )}
                      </div>
                    ) : (
                      item[column.name]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {listTotal === 0 && <p css={styles.emptyMessage}>No {name} found.</p>}
      </div>
      <div css={styles.bottomRow}>
        {listTotal! > 0 && !hidePagination && (
          <div css={styles.paginationWrapper}>
            <AdminListPagination
              listPage={listPage}
              totalRowCount={listTotal!}
              pageCount={pageCount}
              onPageChanged={onPageChanged}
            />
            <AdminListRowCount total={listTotal!} page={listPage} />
          </div>
        )}
      </div>
    </>
  );
};
