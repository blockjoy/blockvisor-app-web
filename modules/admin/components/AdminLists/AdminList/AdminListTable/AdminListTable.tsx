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

type Props = {
  name: string;
  isLoading: boolean;
  columns: AdminListColumn[];
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  activeSortField: number;
  activeSortOrder: SortOrder;
  onPageChanged: (page: number) => void;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
  onFiltersChanged: (filters: AdminListColumn[]) => void;
};

export const AdminListTable = ({
  name,
  columns,
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

  const handleTableScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  if (isLoading)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  const columnsVisible = columns.filter((column) => column.isVisible);
  const columnsWithFilter = columns.filter((column) => column.filterSettings);

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
                    filters={columnsWithFilter}
                    scrollPosition={scrollPosition!}
                    onFiltersChanged={onFiltersChanged}
                    onSortChanged={onSortChanged}
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
      {listTotal! > 0 && (
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
