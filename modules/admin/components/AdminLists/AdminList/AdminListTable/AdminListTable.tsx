import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { styles } from './AdminListTable.styles';
import { AdminListColumn, IAdminItem } from '../AdminList';
import { useRouter } from 'next/router';
import { Copy, TableSkeleton } from '@shared/components';
import { capitalized } from '@modules/admin/utils/capitalized';
import { pageSize } from '@modules/admin/constants/constants';

type Props = {
  name: string;
  isLoading: boolean;
  columns: AdminListColumn[];
  list: IAdminItem[];
  listTotal?: number;
  listPage: number;
  searchTerm?: string;
  onPageChanged: (page: number) => void;
};

export const AdminListTable = ({
  name,
  columns,
  isLoading,
  list,
  listTotal,
  listPage,
  searchTerm,
  onPageChanged,
}: Props) => {
  const router = useRouter();

  const { search, page } = router.query;

  const pageCount = Math.ceil(listTotal! / pageSize);

  const gotoDetails = (id: string) => {
    router.push({
      pathname: '',
      query: {
        name: name.toLowerCase(),
        id,
        search,
        page,
      },
    });
  };

  if (isLoading) return <TableSkeleton />;

  if (listTotal === 0) return <p>No {name} found.</p>;

  return (
    <>
      {searchTerm && (
        <p css={styles.rowCount}>
          Found <var css={styles.rowCountTotal}>{listTotal}</var> {name}
        </p>
      )}
      <div css={styles.wrapper}>
        <table css={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{capitalized(column.name)}</th>
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
                        {item[column.name]}
                        {column.canCopy && (
                          <span className="copy-button" css={styles.copyButton}>
                            <Copy value={item[column.name]} hideTooltip />
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
