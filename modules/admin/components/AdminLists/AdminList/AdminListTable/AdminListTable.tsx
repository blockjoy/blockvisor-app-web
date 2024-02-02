import { styles } from './AdminListTable.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { Copy, TableSkeleton } from '@shared/components';
import { capitalized } from '@modules/admin/utils/capitalized';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { AdminListRowCount } from './AdminListRowCount/AdminListRowCount';
import { AdminListTableSortButton } from './AdminListTableSortButton/AdminListTableSortButton';
import { AdminListFilter } from './AdminListFilter/AdminListFilter';
import { UIEvent, useState } from 'react';

type Props = {
  name: string;
  isLoading: boolean;
  columnsState: AdminListColumn[];
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  activeSortField: number;
  activeSortOrder: SortOrder;
  onPageChanged: (page: number) => void;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFiltersChanged: (filters: AdminListColumn[]) => void;
  onFiltersApplied: VoidFunction;
};

export const AdminListTable = ({
  name,
  columnsState,
  isLoading,
  list,
  listTotal,
  listPage,
  activeSortField,
  activeSortOrder,
  onPageChanged,
  onSortChanged,
  onFiltersChanged,
  onFiltersApplied,
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

  const handleTableScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  if (isLoading)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  const columns = columnsState.filter((column) => column.isVisible);

  return (
    <>
      <section css={styles.tableWrapper} onScroll={handleTableScroll}>
        <table css={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>
                  <span css={styles.tableHeader}>
                    {column.sortField ? (
                      <AdminListTableSortButton
                        sortField={column.sortField}
                        sortOrder={column.sortOrder}
                        activeSortField={activeSortField}
                        activeSortOrder={activeSortOrder}
                        onClick={() =>
                          onSortChanged(column.sortField!, column.sortOrder!)
                        }
                      >
                        {capitalized(column.displayName || column.name)}
                      </AdminListTableSortButton>
                    ) : (
                      capitalized(column.displayName || column.name)
                    )}
                    {Boolean(column.filterSettings) && (
                      <AdminListFilter
                        filtersState={columnsState}
                        filterSettings={column.filterSettings!}
                        onChange={onFiltersChanged}
                        onApplied={onFiltersApplied}
                        onPageChanged={onPageChanged}
                        tableScrollPosition={+scrollPosition!}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listTotal === 0 ? (
              <tr>
                <td>
                  <p css={spacing.top.medium}>No {name} found.</p>
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item['id']} onClick={() => gotoDetails(item.id)}>
                  {columns.map((column) => (
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
      <section css={styles.bottomRow}>
        <AdminListPagination
          listPage={listPage}
          totalRowCount={listTotal!}
          pageCount={pageCount}
          onPageChanged={onPageChanged}
        />
        <AdminListRowCount total={listTotal!} page={listPage} />
      </section>
    </>
  );
};
