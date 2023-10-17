import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { styles } from './AdminCard.styles';
import { AdminCardHeader } from './AdminCardHeader/AdminCardHeader';
import { AdminCardList } from './AdminCardList/AdminCardList';

type Props = {
  name: string;
  icon: React.ReactNode;
  total: string;
  list: Node[] | User[];
  listTotal: number;
  listPage: number;
  columns: string[];
  onSearch: (search: string) => void;
  onPageChanged: (page: number) => void;
};

export const AdminCard = ({
  name,
  icon,
  total,
  list,
  listTotal,
  listPage,
  columns,
  onSearch,
  onPageChanged,
}: Props) => {
  return (
    <article key={name} css={styles.card}>
      <AdminCardHeader
        name={name}
        icon={icon}
        total={total}
        onSearch={onSearch}
      />
      <AdminCardList
        list={list}
        listTotal={listTotal}
        listPage={listPage}
        columns={columns}
        onPageChanged={onPageChanged}
      />
    </article>
  );
};
