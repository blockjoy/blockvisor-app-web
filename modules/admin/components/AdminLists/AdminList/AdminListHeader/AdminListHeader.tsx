import { Skeleton } from '@shared/components';
import { styles } from './AdminListHeader.styles';
import { AdminHeader } from '@modules/admin/components/AdminHeader/AdminHeader';
import { AdminSearch } from '@modules/admin/components/AdminSearch/AdminSearch';

type Props = {
  icon: React.ReactNode;
  name: string;
  isLoading: boolean;
  total: number;
  onSearch: (search: string) => void;
};

export const AdminListHeader = ({
  name,
  isLoading,
  icon,
  total,
  onSearch,
}: Props) => {
  return (
    <AdminHeader icon={icon} name={name}>
      <>
        {!isLoading ? (
          <>
            <div css={styles.total}>
              <var css={[styles.totalValue]}>{total}</var>
              <span className="tooltip" css={styles.totalTooltip}>
                Total
              </span>
            </div>
            <AdminSearch onSearch={onSearch} />
          </>
        ) : (
          <Skeleton width="200px" margin="0 0 0 30px" />
        )}
      </>
    </AdminHeader>
  );
};
