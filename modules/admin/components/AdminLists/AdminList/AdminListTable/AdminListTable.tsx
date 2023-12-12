import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { styles } from './AdminListTable.styles';
import { AdminListColumn, IAdminItem } from '../AdminList';
import { useRouter } from 'next/router';
import { Copy, TableSkeleton } from '@shared/components';
import { capitalized } from '@modules/admin/utils/capitalized';
import { pageSize } from '@modules/admin/constants/constants';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { AdminListTableSortButton } from './AdminListTableSortButton/AdminListTableSortButton';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  name: string;
  isLoading: boolean;
  columns: AdminListColumn[];
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  searchTerm?: string;
  activeSortField: number;
  activeSortOrder: SortOrder;
  onPageChanged: (page: number) => void;
  onSortChanged: (sortField: number, sortOrder: SortOrder) => void;
};

export const AdminListTable = ({
  name,
  columns,
  isLoading,
  list,
  listTotal,
  listPage,
  searchTerm,
  activeSortField,
  activeSortOrder,
  onPageChanged,
  onSortChanged,
}: Props) => {
  const router = useRouter();

  const { search, page, field, order } = router.query;

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

  if (isLoading)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  if (listTotal === 0) return <p>No {name} found.</p>;

  return (
    <>
      {/* {searchTerm && (
        <p css={styles.rowCount}>
          Found <var css={styles.rowCountTotal}>{listTotal}</var> {name}
        </p>
      )} */}
      <div css={styles.wrapper}>
        <table css={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
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
      </div>
      <AdminListPagination
        listPage={listPage}
        totalRowCount={listTotal!}
        pageCount={pageCount}
        onPageChanged={onPageChanged}
      />
    </>
  );
};
