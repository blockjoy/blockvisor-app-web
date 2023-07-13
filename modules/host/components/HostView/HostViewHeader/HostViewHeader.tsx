import { styles } from './HostViewHeader.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import {
  Button,
  DeleteModal,
  HostStatus,
  Skeleton,
  SkeletonGrid,
  SvgIcon,
} from '@shared/components';
import { useHostView } from '@modules/host';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { toast } from 'react-toastify';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const HostViewHeader = () => {
  const router = useRouter();
  const { host, isLoading, deleteHost } = useHostView();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleDeleteHost = () =>
    deleteHost(host?.id!, () => {
      setIsDeleteMode(false);
      toast.success('Host Deleted');
      router.push(ROUTES.HOSTS);
    });

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-host-modal"
          elementName={host?.name!}
          entityName="Host"
          onHide={() => setIsDeleteMode(false)}
          onSubmit={handleDeleteHost}
        />
      )}
      <div css={wrapper.main}>
        <header css={styles.header}>
          {isLoading !== 'finished' && !host?.id ? (
            <SkeletonGrid>
              <Skeleton width="400px" />
            </SkeletonGrid>
          ) : (
            host?.id && (
              <div>
                <h2 css={styles.detailsHeader}>{host!.name}</h2>
                <div css={styles.detailsFooter}>
                  <div css={[styles.hostStatus]}>
                    <HostStatus hasBorder={false} />
                  </div>
                  {host!.ip && (
                    <small css={[typo.small, colors.text2]}>{host!.ip}</small>
                  )}
                  {host!.createdAt && (
                    <small css={[typo.small, colors.text2]}>
                      {formatDistanceToNow(new Date(host!.createdAt), {
                        addSuffix: true,
                      })}
                    </small>
                  )}
                </div>
              </div>
            )
          )}
          <Button onClick={() => setIsDeleteMode(true)} style="basic">
            <SvgIcon>
              <IconDelete />
            </SvgIcon>
            <p>Delete</p>
          </Button>
        </header>
      </div>
    </>
  );
};
