import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { AdminCardListPagination } from './AdminCardListPagination/AdminCardListPagination';
import { styles } from './AdminCardList.styles';

type Props = {
  columns: string[];
  list: Node[] | User[];
  listTotal: number;
  listPage: number;
  onPageChanged: (page: number) => void;
};

export const AdminCardList = ({
  columns,
  list,
  listTotal,
  listPage,
  onPageChanged,
}: Props) => {
  const pageCount = Math.ceil(listTotal / 6);

  if (!listTotal) return null;

  return (
    <>
      <table css={styles.cardTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item['id']}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <AdminCardListPagination
        listPage={listPage}
        pageCount={pageCount}
        onPageChanged={onPageChanged}
      />
    </>
  );
};
