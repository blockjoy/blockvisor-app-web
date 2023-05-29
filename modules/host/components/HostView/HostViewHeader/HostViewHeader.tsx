import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { HostStatus, Skeleton, SkeletonGrid } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './HostViewHeader.styles';
import { wrapper } from 'styles/wrapper.styles';
import { useHostView } from '@modules/host/hooks/useHostView';

export const HostViewHeader = () => {
  const { host, isLoading } = useHostView();

  return (
    <>
      <div css={wrapper.main}>
        <header css={styles.header}>
          {isLoading !== 'finished' && !host?.id ? (
            <SkeletonGrid>
              <Skeleton width="400px" />
            </SkeletonGrid>
          ) : (
            host?.id && (
              <>
                <div>
                  <h2 css={styles.detailsHeader}>{host!.name}</h2>
                  <div css={styles.detailsFooter}>
                    <div css={[styles.hostStatus]}>
                      <HostStatus status={host.status} hasBorder={false} />
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
              </>
            )
          )}
        </header>
      </div>
    </>
  );
};
