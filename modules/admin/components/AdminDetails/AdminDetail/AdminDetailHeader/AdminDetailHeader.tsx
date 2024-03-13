import { openGrafanaUrl } from '@modules/admin/utils';
import { Skeleton } from '@shared/components';
import { AdminHeader } from '../../../AdminHeader/AdminHeader';
import { styles } from './AdminDetailHeader.styles';
import { AdminDetailHeaderDelete, AdminHeaderButton } from '@modules/admin';
import IconCopy from '@public/assets/icons/common/Copy.svg';
import IconPencil from '@public/assets/icons/common/Pencil.svg';
import IconBinoculars from '@public/assets/icons/common/Binoculars.svg';
import IconGraph from '@public/assets/icons/common/Graph.svg';
import IconLogs from '@public/assets/icons/common/Logs.svg';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
  name: string;
  detailsName?: string;
  identifier?: string;
  hasMetrics?: boolean;
  hasLogs?: boolean;
  isLoading?: boolean;
  isEditMode?: boolean;
  canEdit?: boolean;
  additionalHeaderButtons: React.ReactNode;
  onOpenAppView?: VoidFunction;
  onCopyObject?: VoidFunction;
  onToggleEditMode?: VoidFunction;
  onDelete?: (onSuccess: VoidFunction) => void;
};

export const AdminDetailHeader = ({
  name,
  detailsName,
  identifier,
  hasMetrics,
  hasLogs,
  isLoading,
  isEditMode,
  canEdit,
  additionalHeaderButtons,
  onOpenAppView,
  onCopyObject,
  onToggleEditMode,
  onDelete,
}: Props) => {
  const router = useRouter();

  const handleDelete = () => {
    onDelete?.(() => {
      toast.success(`Deleted`);
      router.back();
    });
  };

  return (
    <AdminHeader name={name}>
      <span css={styles.separator}>/</span>
      {isLoading && !isMobile ? (
        <Skeleton width="200px" />
      ) : (
        <div css={styles.wrapper}>
          <h2 css={[styles.name, !isEditMode && styles.nameShortened]}>
            {detailsName}
          </h2>
          {!isEditMode && (
            <div css={styles.buttons}>
              {canEdit && (
                <AdminHeaderButton
                  icon={<IconPencil />}
                  onClick={onToggleEditMode}
                >
                  Edit
                </AdminHeaderButton>
              )}
              {!!onOpenAppView && (
                <AdminHeaderButton
                  icon={<IconBinoculars />}
                  onClick={onOpenAppView}
                >
                  View In App
                </AdminHeaderButton>
              )}
              {!!hasMetrics && (
                <AdminHeaderButton
                  icon={<IconGraph />}
                  onClick={() => openGrafanaUrl?.(identifier!)}
                >
                  Grafana Metrics
                </AdminHeaderButton>
              )}
              {!!hasLogs && (
                <AdminHeaderButton
                  icon={<IconLogs />}
                  onClick={() => openGrafanaUrl(identifier!, 'node-logs')}
                >
                  Grafana Logs
                </AdminHeaderButton>
              )}
              <AdminHeaderButton icon={<IconCopy />} onClick={onCopyObject}>
                Copy Object
              </AdminHeaderButton>
              {additionalHeaderButtons}
              {!!onDelete && (
                <AdminDetailHeaderDelete onDelete={handleDelete} />
              )}
            </div>
          )}
        </div>
      )}
    </AdminHeader>
  );
};
