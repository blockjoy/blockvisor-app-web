import { styles } from './AdminListTable.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { Copy, TableSkeleton } from '@shared/components';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { AdminListRowCount } from './AdminListRowCount/AdminListRowCount';
import { UIEvent, useState } from 'react';
import { AdminListTableHeader } from './AdminListTableHeader/AdminListTableHeader';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';

type Props = {
  name: string;
  isLoading: boolean;
  columns: AdminListColumn[];
  hidePagination?: boolean;
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  activeSortField: number;
  activeSortOrder: SortOrder;
  onPageChanged: (page: number) => void;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFiltersChanged: (nextFilters: AdminListColumn[]) => void;
};

export const AdminListTable = ({
  name,
  columns,
  hidePagination,
  isLoading,
  list,
  listTotal,
  listPage,
  activeSortField,
  activeSortOrder,
  onPageChanged,
  onSortChanged,
  onFiltersChanged,
}: Props) => {
  const router = useRouter();

  const { search, page, field, order } = router.query;

  const [scrollPosition, setScrollPosition] = useState<number>();

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

  const handleTableScroll = (e: UIEvent<HTMLDivElement>) =>
    setScrollPosition(e.currentTarget.scrollLeft);

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

  if (isLoading)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  const columnsVisible = columns.filter((column) => column.isVisible);

  return (
    <>
      <section css={styles.tableWrapper} onScroll={handleTableScroll}>
        <table css={styles.table}>
          <thead>
            <tr>
              {columnsVisible.map((column) => (
                <th
                  key={column.name}
                  css={styles.tableCellWidth(column.width!)}
                >
                  <AdminListTableHeader
                    activeSortField={activeSortField}
                    activeSortOrder={activeSortOrder}
                    column={column}
                    scrollPosition={scrollPosition!}
                    onFilterChange={handleFilterChange}
                    onSortChanged={onSortChanged}
                    onReset={handleReset}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listTotal === 0 ? (
              <tr>
                <td colSpan={1000}>
                  <p css={[spacing.top.medium, spacing.bottom.medium]}>
                    No {name} found.
                  </p>
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item['id']} onClick={() => gotoDetails(item.id)}>
                  {columnsVisible.map((column) => (
                    <td
                      key={column.name}
                      css={styles.tableCellWidth(column.width!)}
                    >
                      {column.canCopy ? (
                        <div css={styles.copyTd}>
                          {item[column.name] || '-'}
                          {column.canCopy && (
                            <span
                              className="copy-button"
                              css={styles.copyButton}
                            >
                              <Copy
                                value={item[column.name] || ''}
                                hideTooltip
                              />
                            </span>
                          )}
                        </div>
                      ) : (
                        item[column.name]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {listTotal! > 0 && !hidePagination && (
        <section css={styles.bottomRow}>
          <AdminListPagination
            listPage={listPage}
            totalRowCount={listTotal!}
            pageCount={pageCount}
            onPageChanged={onPageChanged}
          />
          <AdminListRowCount total={listTotal!} page={listPage} />
        </section>
      )}
    </>
  );
};
