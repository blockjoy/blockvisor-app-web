import { Skeleton } from '@shared/components';
import { AdminHeader } from '../../../AdminHeader/AdminHeader';
import { styles } from './AdminDetailsHeader.styles';

type Props = {
  icon: React.ReactNode;
  name: string;
  detailsName?: string;
  isLoading?: boolean;
  onOpenAppView?: VoidFunction;
};

export const AdminDetailsHeader = ({
  icon,
  name,
  detailsName,
  isLoading,
  onOpenAppView,
}: Props) => {
  return (
    <AdminHeader name={name} icon={icon}>
      <div css={styles.wrapper}>
        <span css={styles.separator}>/</span>

        {isLoading ? (
          <Skeleton width="200px" />
        ) : (
          <>
            <h2>{detailsName}</h2>
            {!!onOpenAppView && (
              <button css={styles.button} onClick={onOpenAppView}>
                Open In App
              </button>
            )}
          </>
        )}
      </div>
    </AdminHeader>
  );
};
