import { styles } from './AdminListRowCount.styles';
import { pageSize } from '@modules/admin/constants/constants';

type Props = {
  total: number;
  page: number;
};

export const AdminListRowCount = ({ total, page }: Props) => {
  const fromPage = page === 1 ? page : (page - 1) * pageSize + 1;

  const toPage = Math.min(
    fromPage === 1 ? pageSize : fromPage + pageSize - 1,
    total,
  );

  return (
    <p css={styles.rowCount}>
      <em>{fromPage}</em> to <em>{toPage}</em> of <em>{total}</em>
    </p>
  );
};
