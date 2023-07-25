import { styles } from './HostViewHeader.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  Button,
  DeleteModal,
  HostStatus,
  Skeleton,
  SkeletonGrid,
  SvgIcon,
} from '@shared/components';
import { useHostView } from '@modules/host';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { toast } from 'react-toastify';
import { HostViewHeaderScrolledDown } from './HeaderScrolledDown/HostViewHeaderScrolledDown';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const heightForScrolledDown = 76;

export const HostViewHeader = () => {
  const router = useRouter();
  const { host, isLoading, deleteHost } = useHostView();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const handleDeleteHost = () =>
    deleteHost(host?.id!, () => {
      setIsDeleteMode(false);
      toast.success('Host Deleted');
      router.push(ROUTES.HOSTS);
    });

  if (!host?.id) return null;

  const handleScroll = () => {
    const { pageYOffset } = window;
    if (pageYOffset > heightForScrolledDown && !isScrolledDown) {
      setIsScrolledDown(true);
    } else if (pageYOffset <= heightForScrolledDown && isScrolledDown) {
      setIsScrolledDown(false);
    }
  };

  const handleDeleteToggled = () => setIsDeleteMode(!isDeleteMode);

  const canDelete = !host?.nodeCount;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-host-modal"
          elementName={host?.name!}
          entityName="Host"
          onHide={handleDeleteToggled}
          onSubmit={handleDeleteHost}
        />
      )}
      <HostViewHeaderScrolledDown
        isVisible={isScrolledDown}
        canDelete={canDelete}
        onDeleteClicked={handleDeleteToggled}
      />
      <header css={[styles.header]}>
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
        <Button
          disabled={host!.nodeCount > 0}
          tooltip={
            host!.nodeCount > 0 && !isScrolledDown ? 'Has Nodes Attached' : ''
          }
          onClick={handleDeleteToggled}
          style="basic"
        >
          <SvgIcon>
            <IconDelete />
          </SvgIcon>
          <p>Delete</p>
        </Button>
      </header>
    </>
  );
};
