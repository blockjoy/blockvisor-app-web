import { Skeleton } from '@shared/components';
import { AdminHeader } from '../../../AdminHeader/AdminHeader';
import { styles } from './AdminDetailHeader.styles';
import { SvgIcon } from '@shared/components';
import CopyIcon from '@public/assets/icons/common/Copy.svg';

type Props = {
  icon: React.ReactNode;
  name: string;
  detailsName?: string;
  isLoading?: boolean;
  onOpenAppView?: VoidFunction;
  onCopyObject?: VoidFunction;
};

export const AdminDetailHeader = ({
  icon,
  name,
  detailsName,
  isLoading,
  onOpenAppView,
  onCopyObject,
}: Props) => {
  return (
    <AdminHeader name={name} icon={icon}>
      <span css={styles.separator}>/</span>
      {isLoading ? (
        <Skeleton width="200px" />
      ) : (
        <>
          <h2 css={styles.name}>{detailsName}</h2>
          <div css={styles.buttons}>
            {!!onOpenAppView && (
              <button css={styles.button} onClick={onOpenAppView}>
                Open In App
              </button>
            )}
            <button css={styles.button} onClick={onCopyObject}>
              <SvgIcon size="12px">
                <CopyIcon />
              </SvgIcon>{' '}
              Copy Object
            </button>
          </div>
        </>
      )}
    </AdminHeader>
  );
};
