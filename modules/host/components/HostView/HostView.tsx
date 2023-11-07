import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styles } from './HostView.styles';
import { EmptyColumn, SkeletonView } from '@shared/components';
import { useHostView, HostViewTabs, HostViewHeader } from '@modules/host';
import { useNodeList } from '@modules/node';
import { HostViewSidePanel } from './HostViewSidePanel/HostViewSidePanel';

type HostViewProps = {
  children: ReactNode;
};

export const HostView = ({ children }: HostViewProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { host, loadHost, unloadHost, isLoading } = useHostView();
  const { listNodesByHost } = useNodeList();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        listNodesByHost(id as string, {
          current_page: 0,
          items_per_page: 48,
        });
        loadHost(id);
      }
    })();
    return () => {
      if (router.isReady) unloadHost();
    };
  }, [id]);

  return (
    <>
      {isLoading === 'finished' && !host?.id ? (
        <EmptyColumn
          title="Host Not Found"
          description="No host exists with this ID"
        />
      ) : (
        <>
          {host?.id && (
            <>
              <HostViewHeader />
              <HostViewTabs />
            </>
          )}
          <div css={styles.wrapper}>
            {isLoading !== 'finished' && !host?.id ? (
              <div css={styles.loader}>
                <SkeletonView />
              </div>
            ) : (
              <>
                <div css={styles.content}>{children}</div>
                <div css={styles.sidePanel}>
                  <HostViewSidePanel />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
