import { styles } from './HostViewHeader.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { DeleteModal, Skeleton, SkeletonGrid } from '@shared/components';
import { useHostView } from '@modules/host';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { toast } from 'react-toastify';
import { HostViewHeaderActions } from './HostViewHeaderActions/HostViewHeaderActions';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const HostViewHeader = () => {
  const router = useRouter();
  const { host, isLoading, deleteHost } = useHostView();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleDeleteHost = () =>
    deleteHost(host?.hostId!, () => {
      setIsDeleteMode(false);
      toast.success('Host Deleted');
      router.push(ROUTES.HOSTS);
    });

  if (!host?.hostId) return null;

  const handleDeleteToggled = () => setIsDeleteMode(!isDeleteMode);

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-host-modal"
          elementName={host?.displayName! || host?.networkName}
          entityName="Host"
          onHide={handleDeleteToggled}
          onSubmit={handleDeleteHost}
        />
      )}
      <header css={[styles.header]}>
        {isLoading !== 'finished' && !host?.hostId ? (
          <SkeletonGrid>
            <Skeleton width="400px" />
          </SkeletonGrid>
        ) : (
          host?.hostId && (
            <div>
              <h2 css={styles.detailsHeader}>
                {host!.displayName || host.networkName}
              </h2>
              <div css={styles.detailsFooter}>
                {host!.createdAt && (
                  <small css={[typo.small, colors.text2]}>
                    Launched{' '}
                    {formatDistanceToNow(new Date(host!.createdAt), {
                      addSuffix: true,
                    })}
                  </small>
                )}
              </div>
            </div>
          )
        )}
        <HostViewHeaderActions onDeleteClicked={handleDeleteToggled} />
      </header>
    </>
  );
};
