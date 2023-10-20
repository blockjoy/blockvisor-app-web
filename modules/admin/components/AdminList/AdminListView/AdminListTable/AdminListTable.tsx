import { AdminListPagination } from './AdminListPagination/AdminListPagination';
import { styles } from './AdminListTable.styles';
import { AdminListColumn, AdminSupportedViews } from '../AdminListView';
import { useRouter } from 'next/router';
import { EmptyColumn, TableSkeleton } from '@shared/components';

type Props = {
  name: string;
  columns: AdminListColumn[];
  list: AdminSupportedViews;
  listTotal?: number;
  listPage: number;
  onPageChanged: (page: number) => void;
};

export const AdminListTable = ({
  name,
  columns,
  list,
  listTotal,
  listPage,
  onPageChanged,
}: Props) => {
  const router = useRouter();

  const pageCount = Math.ceil(listTotal! / 10);

  const gotoDetails = (id: string) => {
    router.push({
      pathname: '',
      query: {
        name: name.toLowerCase(),
        id,
      },
    });
  };

  if (listTotal === undefined) return <TableSkeleton />;

  if (listTotal === 0) return <p>No {name} found.</p>;

  return (
    <>
      <div css={styles.wrapper}>
        <table css={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.name}</th>
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
                    {item[column.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminListPagination
        listPage={listPage}
        totalRowCount={listTotal}
        pageCount={pageCount}
        onPageChanged={onPageChanged}
      />
    </>
  );
};
