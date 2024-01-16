import { Skeleton } from '@shared/components';
import { AdminHeader } from '../../../AdminHeader/AdminHeader';
import { styles } from './AdminDetailHeader.styles';
import { SvgIcon } from '@shared/components';
import IconCopy from '@public/assets/icons/common/Copy.svg';
import IconPencil from '@public/assets/icons/common/Pencil.svg';
import IconBinoculars from '@public/assets/icons/common/Binoculars.svg';

type Props = {
  name: string;
  detailsName?: string;
  isLoading?: boolean;
  isEditMode?: boolean;
  canEdit?: boolean;
  onOpenAppView?: VoidFunction;
  onCopyObject?: VoidFunction;
  onToggleEditMode?: VoidFunction;
};

export const AdminDetailHeader = ({
  name,
  detailsName,
  isLoading,
  isEditMode,
  canEdit,
  onOpenAppView,
  onCopyObject,
  onToggleEditMode,
}: Props) => {
  return (
    <AdminHeader name={name}>
      <span css={styles.separator}>/</span>
      {isLoading ? (
        <Skeleton width="200px" />
      ) : (
        <div css={styles.wrapper}>
          <h2 css={[styles.name, !isEditMode && styles.nameShortened]}>
            {detailsName}
          </h2>
          {!isEditMode && (
            <div css={styles.buttons}>
              {canEdit && (
                <button css={styles.button} onClick={onToggleEditMode}>
                  <SvgIcon size="12px">
                    <IconPencil />
                  </SvgIcon>{' '}
                  Edit
                </button>
              )}
              {!!onOpenAppView && (
                <button css={styles.button} onClick={onOpenAppView}>
                  <SvgIcon size="12px">
                    <IconBinoculars />
                  </SvgIcon>{' '}
                  View
                </button>
              )}
              <button css={styles.button} onClick={onCopyObject}>
                <SvgIcon size="12px">
                  <IconCopy />
                </SvgIcon>{' '}
                Json
              </button>
            </div>
          )}
        </div>
      )}
    </AdminHeader>
  );
};
